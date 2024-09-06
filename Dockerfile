# syntax=docker/dockerfile:1.4
FROM node:20.17.0-alpine as base

# 安装依赖工具
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    --no-install-recommends

# 添加 Chromium 官方源
RUN apt-get install -y software-properties-common \
    && wget -qO - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update

# 安装 Chromium 浏览器
RUN apt-get install -y \
    chromium \
    --no-install-recommends

# 清理缓存，减小镜像大小
RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 设置环境变量，确保可以通过 Puppeteer 或类似工具使用 Chromium
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROME_PATH=/usr/lib/chromium


FROM base as package

# 安装项目依赖
WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnmp install --frozen-lockfile


FROM package as project
LABEL MAINTAINER Jiang
WORKDIR /app

# 复制项目代码和 node_modules
COPY --from=package /app/node_modules ./node_modules
COPY . /app

# 编译 typescript
RUN npm run build

ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
