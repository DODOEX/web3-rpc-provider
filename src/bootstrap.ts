import express, {Request, Response} from 'express';
import puppeteer from 'puppeteer-core';
import { PickerClass } from "./common"
import { Garden } from './garden';
import { ChainList } from './pickers/chainlist';

async function bootstrap() {
  const app = express();
  const port = 3000;
  const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args:
      ['--no-sandbox', '--disabled-setupid-sandbox'],
      // 更换成本地的 Chromium 地址
      // 浏览器访问 chrome://version/, 复制“可执行文件路径”
  });
  const map = new Map<string, PickerClass>();
  map.set("chainlist", ChainList);
  const graden = new Garden(browser, map);

  app.get('/', async (req: Request<any, any, any,{ sources: string[], chainIds: number[] }>, res: Response) => {
    if (!req.query.sources || !req.query.chainIds) {
      res.send([]);
      return;
    }
    const result = await graden.collect(req.query.sources, req.query.chainIds.map(Number))
    res.send(result);
  });

  app.get('/:chainId', async (req: Request<{ chainId: string }, any, any,{ sources: string[] }>, res: Response) => {
    if (!req.query.sources || !req.params.chainId) {
      res.send([]);
      return;
    }
    const result = await graden.collect(req.query.sources, [Number(req.params.chainId)])
    res.send(result);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

bootstrap();
