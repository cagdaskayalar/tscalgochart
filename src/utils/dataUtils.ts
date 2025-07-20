export type OHLCData = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

/**
 * Paralel JSON veri yapısını diziye dönüştürür.
/**
 * Paralel JSON veri yapısını diziye dönüştürür.
 * @param rawData JSON dosyasındaki ana veri objesi
 */
export function parseParallelJsonToArray(
  rawData: {
    Time: Record<string, string>;
    Open: Record<string, number>;
    High: Record<string, number>;
    Low: Record<string, number>;
    Close: Record<string, number>;
  }
): OHLCData[] {
  const times = rawData.Time;
  const opens = rawData.Open;
  const highs = rawData.High;
  const lows = rawData.Low;
  const closes = rawData.Close;

  // Tüm indexleri bul (Time anahtarları referans alınır)
  const indices = Object.keys(times);

  return indices.map((i) => ({
    time: times[i],
    open: opens[i],
    high: highs[i],
    low: lows[i],
    close: closes[i],
  }));
} 