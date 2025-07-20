import { useState, useEffect } from "react";
import type { OHLCData } from "../utils/dataUtils";

export function useChartData() {
  const [data, setData] = useState<OHLCData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/data/sample-data.json');
        if (!response.ok) {
          throw new Error('Veri yüklenemedi');
        }
        
        const jsonData = await response.json();
        
        // Paralel JSON yapısını OHLCData dizisine dönüştür
        const timeData = jsonData.Time || {};
        const openData = jsonData.Open || {};
        const highData = jsonData.High || {};
        const lowData = jsonData.Low || {};
        const closeData = jsonData.Close || {};
        
        const ohlcData: OHLCData[] = [];
        const keys = Object.keys(timeData);
        
        // İlk 100 veriyi al (test için)
        const limitedKeys = keys.slice(0, 100);
        
        limitedKeys.forEach((key) => {
          ohlcData.push({
            time: timeData[key],
            open: parseFloat(openData[key] || 0),
            high: parseFloat(highData[key] || 0),
            low: parseFloat(lowData[key] || 0),
            close: parseFloat(closeData[key] || 0),
          });
        });
        
        console.log('Loaded OHLC data:', ohlcData.length, 'items');
        setData(ohlcData);
      } catch (err) {
        console.error('Data loading error:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
