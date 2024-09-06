import { Browser } from "puppeteer-core";
import { PickerClass, RPC } from "./common";
import * as utils from './utils';

export class Garden {
  constructor(
    private readonly browser: Browser,
    private readonly pickers: Map<string, PickerClass>,
    private readonly options: {maxPages: number} = {maxPages: 5},
  ) {}

  async collect(sources: string[], chainIds: number[]) {
    if (sources.length <= 0 || chainIds.length <= 0) {
      return [];
    }

    const size = Math.min(sources.length, this.options.maxPages);
    const pages = await Promise.all(utils.times(size, () => this.browser.newPage()));
    const chunks = utils.chunks(sources, size);

    const result = [];
    for (let i = 0; i < chunks.length; i++) {

      const _values = await Promise.all(chunks[i].map((label, j): Promise<RPC[]> | void => {
        const Clazz = this.pickers.get(label);
        if (!Clazz) return;
        try {
          const picker = new Clazz(pages[j]);
          return picker.pick(chainIds);
        } catch(err: any) {
          console.error(`${label} got an error: ${err.name}`);
          console.error(err);
          return;
        }
      }));

      const values = utils.compact(_values).flat()
      if (values.length > 0) {
        result.push(...values);
      }
    }

    await Promise.all(pages.map(page => page.close()));

    return utils.unique(result, (ele) => ele.chainId + ele.url);
  }
}
