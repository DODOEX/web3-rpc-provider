import "expect-puppeteer"
import {ChainList} from "../../src/pickers/chainlist"

jest.setTimeout(60 * 1000);

describe('class ChainList', () => {
  describe('pick()', () => {
    beforeEach(async () => {
      await jestPuppeteer.resetBrowser();
      await jestPuppeteer.resetPage();
    });

    it('should match "#__NEXT_DATA__"', async () => {
      const chains = [1, 56]
      const chainlist = new ChainList(page);
      const result = await chainlist.pick(chains);

      await expect(page).toMatchElement('#__NEXT_DATA__');
      expect(result).toContainEqual(
        expect.objectContaining({ chainId: 1, url: expect.any(String) })
      );
      expect(result).toContainEqual(
        expect.objectContaining({ chainId: 56, url: expect.any(String) })
      );
    });
  });
});
