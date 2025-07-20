import { timeFormat } from "d3-time-format";
import financeDiscontinuousScale from "./financeDiscontinuousScale";
import { slidingWindow, zipper, isNotDefined } from "../utils";
import { defaultFormatters, levelDefinition } from "./levels";

// Artık sadece string-string map olarak kullanıyoruz
// (d3-format fonksiyonları ile uyumlu hale getirmek için gerekirse fonksiyon map'e dönebilir)
type FormatterMap = Record<string, string>;

function evaluateLevel(
  d: Record<string, unknown>,
  date: Date,
  i: number,
  formatters: FormatterMap
) {
  return levelDefinition
    .map((eachLevel, idx) => ({
      level: levelDefinition.length - idx - 1,
      format: formatters[eachLevel(d, date, i) as string],
    }))
    .find((l) => !!l.format);
}

const discontinuousIndexCalculator = slidingWindow()
  .windowSize(2)
  .undefinedValue(
    (
      d: Date,
      idx: number,
      opts: { initialIndex: number; formatters: FormatterMap }
    ) => {
      const i = opts.initialIndex + idx;
      const row = {
        date: d.getTime(),
        startOf30Seconds: false,
        startOfMinute: false,
        startOf5Minutes: false,
        startOf15Minutes: false,
        startOf30Minutes: false,
        startOfHour: false,
        startOfEighthOfADay: false,
        startOfQuarterDay: false,
        startOfHalfDay: false,
        startOfDay: true,
        startOfWeek: false,
        startOfMonth: false,
        startOfQuarter: false,
        startOfYear: false,
      };
      const level = evaluateLevel(row, d, i, opts.formatters);
      return { ...row, index: i, ...level };
    }
  );

const discontinuousIndexCalculatorLocalTime = discontinuousIndexCalculator.accumulator(
  (
    [prevDate, nowDate]: [unknown, unknown],
    i: number,
    _idx: number,
    opts: { initialIndex: number; formatters: FormatterMap }
  ) => {
    // Date objelerini kontrol et ve dönüştür
    const prev = prevDate instanceof Date ? prevDate : new Date(prevDate as string);
    const now = nowDate instanceof Date ? nowDate : new Date(nowDate as string);
    
    const startOf30Seconds = now.getSeconds() % 30 === 0;
    const startOfMinute = now.getMinutes() !== prev.getMinutes();
    const startOf5Minutes =
      startOfMinute && now.getMinutes() % 5 <= prev.getMinutes() % 5;
    const startOf15Minutes =
      startOfMinute && now.getMinutes() % 15 <= prev.getMinutes() % 15;
    const startOf30Minutes =
      startOfMinute && now.getMinutes() % 30 <= prev.getMinutes() % 30;
    const startOfHour = now.getHours() !== prev.getHours();
    const startOfEighthOfADay = startOfHour && now.getHours() % 3 === 0;
    const startOfQuarterDay = startOfHour && now.getHours() % 6 === 0;
    const startOfHalfDay = startOfHour && now.getHours() % 12 === 0;
    const startOfDay = now.getDay() !== prev.getDay();
    const startOfWeek = now.getDay() < prev.getDay();
    const startOfMonth = now.getMonth() !== prev.getMonth();
    const startOfQuarter =
      startOfMonth && now.getMonth() % 3 <= prev.getMonth() % 3;
    const startOfYear = now.getFullYear() !== prev.getFullYear();

    const row = {
      date: now.getTime(),
      startOf30Seconds,
      startOfMinute,
      startOf5Minutes,
      startOf15Minutes,
      startOf30Minutes,
      startOfHour,
      startOfEighthOfADay,
      startOfQuarterDay,
      startOfHalfDay,
      startOfDay,
      startOfWeek,
      startOfMonth,
      startOfQuarter,
      startOfYear,
    };
    const level = evaluateLevel(row, now, i, opts.formatters);
    return { ...row, index: i + opts.initialIndex, ...level };
  }
);

function doStuff(
  realDateAccessor: (fn: (d: Record<string, unknown>) => unknown) => (d: Record<string, unknown>) => Date,
  inputDateAccessor: (d: Record<string, unknown>) => unknown,
  initialIndex: number,
  formatters: FormatterMap
) {
  return function (data: Record<string, unknown>[]) {
    const dateAccessor = realDateAccessor(inputDateAccessor);
    const calculate = discontinuousIndexCalculatorLocalTime
      .source(dateAccessor)
      .misc({ initialIndex, formatters });

    const index = calculate(data).map((each) => {
      // Type assertion to satisfy TypeScript, since calculate returns unknown[]
      const item = each as Record<string, unknown> & { format: string; index: number; level: number; date: number };
      const { format } = item;
      return {
        index: item.index,
        level: item.level,
        date: new Date(item.date),
        format: timeFormat(format),
      };
    });

    return { index };
  };
}

export function discontinuousTimeScaleProvider(
  data: Record<string, unknown>[],
  options?: {
    initialIndex?: number;
    inputDateAccessor?: (d: Record<string, unknown>) => unknown;
    indexAccessor?: (d: Record<string, unknown>) => unknown;
    indexMutator?: (d: Record<string, unknown>, idx: number) => Record<string, unknown>;
    withIndex?: unknown;
    formatters?: FormatterMap;
    realDateAccessor?: (fn: (d: Record<string, unknown>) => unknown) => (d: Record<string, unknown>) => Date;
  }
) {
  const {
    initialIndex = 0,
    inputDateAccessor = (d: Record<string, unknown>) => d.date,
    indexAccessor = (d: Record<string, unknown>) => d.idx,
    indexMutator = (d: Record<string, unknown>, idx: number) => ({ ...d, idx }),
    withIndex,
    formatters = defaultFormatters,
    realDateAccessor = (fn: (d: Record<string, unknown>) => unknown) => (d: Record<string, unknown>) => new Date(fn(d) as string),
  } = options || {};

  let index = withIndex;

  if (isNotDefined(index)) {
    const response = doStuff(
      realDateAccessor,
      inputDateAccessor,
      initialIndex,
      formatters as FormatterMap
    )(data);

    index = response.index;
  }

  const inputIndex = index as unknown[];
  const xScale = financeDiscontinuousScale(inputIndex);

  const mergedData = zipper<Record<string, unknown>>().combine(indexMutator);

  const finalData = mergedData(data, inputIndex);

  return {
    data: finalData,
    xScale,
    xAccessor: (d: Record<string, unknown>) => {
      const idx = indexAccessor(d);
      return typeof idx === 'number' ? idx : undefined;
    },
    displayXAccessor: realDateAccessor(inputDateAccessor),
  };
} 