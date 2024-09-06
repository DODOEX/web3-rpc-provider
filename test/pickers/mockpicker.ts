import { Page } from "puppeteer-core";
import { Picker, RPC } from "../../src/common";

export default class MockPicker implements Picker {
    constructor(private _page: Page) {}

    async pick(chainIds: number[]): Promise<RPC[]> {
      return [{chainId: 0, url: ""}]
    }
}
