// Basit stub ve yardımcı fonksiyonlar

export const identity = <T>(x: T) => x;

export function isNotDefined(x: unknown): boolean {
  return x === undefined || x === null;
}

export function isDefined(x: unknown): boolean {
  return !isNotDefined(x);
}

export function head<T>(arr: T[]): T | undefined {
  return arr[0];
}

export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

export function getClosestItemIndexes<T>(data: T[], value: number, accessor: (d: T) => number) {
  // Basit binary search stub
  let left = 0, right = data.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (accessor(data[mid]) < value) left = mid + 1;
    else right = mid;
  }
  return { left, right };
}

function noop() {}

export function getLogger(prefix: string) {
  let logger = noop;
  // Vite/React için import.meta.env kullanılır
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.MODE !== "production") {
    logger = (...args: unknown[]) => {
      console.log(`[${prefix}]`, ...args);
    };
  }
  return logger;
}

// SlidingWindow implementasyonu
type SlidingWindowType = {
  windowSize: (n: number) => SlidingWindowType;
  undefinedValue: (v: unknown) => SlidingWindowType;
  accumulator: (fn: unknown) => SlidingWindowType;
  source: (fn: unknown) => SlidingWindowType;
  misc: (obj: unknown) => SlidingWindowType;
  (data: unknown[]): unknown[];
};

export function slidingWindow(): SlidingWindowType {
  let _windowSize = 2;
  let _accumulator: unknown = undefined;
  let _misc: unknown = undefined;

  const calculate = ((data: unknown[]) => {
    if (!Array.isArray(data) || data.length === 0) return [];
    
    const result = [];
    for (let i = 0; i <= data.length - _windowSize; i++) {
      const window = data.slice(i, i + _windowSize);
      if (_accumulator && typeof _accumulator === 'function') {
        try {
          const processedResult = (_accumulator as (...args: unknown[]) => unknown)(window, i, i, _misc);
          result.push(processedResult);
        } catch (error) {
          console.warn('SlidingWindow accumulator error:', error);
          result.push(window);
        }
      } else {
        result.push(window);
      }
    }
    return result;
  }) as SlidingWindowType;

  calculate.windowSize = (n: number) => {
    _windowSize = n;
    return calculate;
  };
  calculate.undefinedValue = () => {
    return calculate;
  };
  calculate.accumulator = (fn: unknown) => {
    _accumulator = fn;
    return calculate;
  };
  calculate.source = () => {
    return calculate;
  };
  calculate.misc = (obj: unknown) => {
    _misc = obj;
    return calculate;
  };

  return calculate;
}

// Zipper implementasyonu
type ZipperType<T = unknown> = {
  combine: (fn: (data: T, index: number) => T) => (data: T[], index: unknown[]) => T[];
};

export function zipper<T = unknown>(): ZipperType<T> {
  return {
    combine: (fn: (data: T, index: number) => T) => {
      return (data: T[], index: unknown[]) => {
        if (!Array.isArray(data) || !Array.isArray(index)) return [];
        
        const result: T[] = [];
        const maxLength = Math.min(data.length, index.length);
        
        for (let i = 0; i < maxLength; i++) {
          result.push(fn(data[i], i));
        }
        
        return result;
      };
    },
  };
} 