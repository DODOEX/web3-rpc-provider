import {PickerClass, RPC} from "../src/common"
import {Garden} from "../src/garden"
import MockPicker from './pickers/mockpicker'
import { CdpPage } from 'puppeteer-core/lib/cjs/puppeteer/index-browser.js';
jest.mock('./pickers/mockpicker')

jest.setTimeout(60 * 1000);
describe('class Garden', () => {
  const map = new Map<string, PickerClass>()
  map.set("mockpicker", MockPicker)

  beforeAll(async () => {
    await jestPuppeteer.resetBrowser();
    await jestPuppeteer.resetPage();
  });

  describe('constructor()', () => {

    it('should accept argument Page', async () => {
      const chains = [1];
      const garden = new Garden(browser, map);
      await garden.collect(["mockpicker"], chains);
      expect(MockPicker).toHaveBeenCalledTimes(1);
      expect(MockPicker).toHaveBeenCalledWith(expect.anything());
    })
  })

  describe('collect()', () => {

    it('should call picker with sources', async () => {
      const chainIds = [1];
      const garden = new Garden(browser, map);
      const result = await garden.collect([], chainIds);

      expect(result).toEqual([]);
    });

    it('should return empty array when empty chainIds', async () => {
      const garden = new Garden(browser, map);
      const result = await garden.collect(["mockpicker"], []);

      expect(result).toEqual([]);
    });

    it('should call picker with chainIds', async () => {
      const chainIds = [1];
      const rpcs = [{chainId: 1, url: "http://mockpicker"}]

      const mockPick = jest.spyOn(MockPicker.prototype, 'pick');
      mockPick.mockResolvedValue(rpcs)
      const garden = new Garden(browser, map);
      const result = await garden.collect(["mockpicker"], chainIds);

      expect(mockPick).toHaveBeenCalledWith(chainIds);
      expect(result).toEqual(rpcs);
    });
  });
});
