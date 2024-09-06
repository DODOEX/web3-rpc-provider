import { Page } from "puppeteer-core";

export type RPC = {
  chainId: number
  url: string
}

export interface Picker {
  pick(chainIds: number[]): Promise<RPC[]>;
}

export interface PickerClass {
  new(page: Page): Picker;
}
