import { rejects } from "assert";

export function times<T = unknown>(n: number, fn: (index: number) => T): T[] {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(fn(i));
  }
  return results;
}

export function chunks<T = unknown>(list: T[], size: number): T[][] {
  let length = list.length, i = 0, j = 0;
  const result = Array(Math.ceil(length / size));
  while (i < list.length) {
    let index = -1,
        start = i,
        end = i += size;

    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    let values = Array(length);
    while (++index < length) {
      values[index] = list[index + start];
    }
    result[j++] = values;
  }

  return result;
}

export function compact<T, E = Exclude<T, null | undefined | void>>(list: T[]): E[] {
  const result: E[] = [];
  for (let i = 0; i < list.length; i++) {
    if (typeof list[i] !== 'undefined' && list[i] !== null) {
      result.push(list[i] as unknown as E);
    }
  }
  return result;
}

export function unique<T>(list: T[], fn: (element: T) => unknown): T[] {
  const exists: Record<string, boolean> = {}, result = [];
  for (let i = 0; i < list.length; i++) {
    const key = String(fn ? fn(list[i]) : list[i]);
    if (!exists[key]) {
      exists[key] = true;
      result.push(list[i]);
    }
  }
  return result;
}

export function sleep(ms: number): Promise<undefined> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
