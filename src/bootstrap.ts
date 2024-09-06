import express, {Express, Request, Response} from 'express';
import puppeteer, {Browser} from 'puppeteer-core';
import { PickerClass } from "./common"
import { Garden } from './garden';
import * as pickers from './pickers';

async function bootstrap() {
  const port = 3000;
  const app: Express = express();
  const browser: Browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args:
      ['--no-sandbox', '--disabled-setupid-sandbox'],
      // 更换成本地的 Chromium 地址
      // 浏览器访问 chrome://version/, 复制“可执行文件路径”
  });
  const map = new Map<string, PickerClass>();
  Object.entries(pickers).forEach(([key, value]) => {
    map.set(key, value);
    console.log(`Loaded ${key}.`);
  });
  const graden = new Garden(browser, map);

  app.get('/endpoints', async (req: Request<unknown, unknown, unknown,{ sources: string[], chains: number[] }>, res: Response) => {
    if (!req.query.sources || !req.query.chains) {
      res.send([]);
      return;
    }
    const result = await graden.collect(req.query.sources, req.query.chains.map(Number))
    res.send(result);
  });

  app.get('/:chain/endpoints', async (req: Request<{ chain: string }, unknown, unknown,{ sources: string[] }>, res: Response) => {
    if (!req.query.sources || !req.params.chain) {
      res.send([]);
      return;
    }
    const result = await graden.collect(req.query.sources, [Number(req.params.chain)])
    res.send(result);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

void bootstrap();
