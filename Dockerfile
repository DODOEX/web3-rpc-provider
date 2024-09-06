# syntax=docker/dockerfile:1

## 基础镜像，用于安装基础的依赖软件
FROM node:20.17.0-alpine as base

# 添加 Chromium 官方源
RUN echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "@edgecommunity http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories

# 安装 Chromium 浏览器
RUN apk add --no-cache \
    chromium

# 清理缓存，减小镜像大小
RUN rm -rf /var/cache/apk/*

# 设置环境变量，确保可以通过 Puppeteer 或类似工具使用 Chromium
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/ \
    CHROMIUM_FLAGS="--disable-software-rasterizer --disable-dev-shm-usage"


## 项目依赖包镜像
FROM base as deps
# 启用 pnpm
ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 安装项目依赖
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


## 项目代码镜像
FROM deps as app
LABEL MAINTAINER=xxamxx
WORKDIR /app

# 复制项目代码和 node_modules， 编译 typescript
COPY --from=deps /app/node_modules ./node_modules
COPY . /app
RUN npm run build

# 启动服务进程
EXPOSE 3000
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"
CMD ["node", "./dist/bootstrap.js"]
