
import React, { useCallback } from "react";
import "./App.css";
import { ChartProvider } from "./context/ChartContext";
import ChartCanvas from "./components/ChartCanvas";
import Chart from "./components/Chart";
import CandleStickSeries from "./components/CandleStickSeries";
import XAxis from "./components/XAxis";
import YAxis from "./components/YAxis";

function App() {
  const yExtents = useCallback((data: unknown[]) => {
    if (!data || data.length === 0) return [0, 100];
    const ohlcData = data as Array<{ open: number; high: number; low: number; close: number }>;
    const allValues = ohlcData.flatMap(d => [d.open, d.high, d.low, d.close]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  }, []);

  return (
    <div className="App">
      <h1>TS Algo Chart - Mum Grafik Örneği</h1>
      <ChartProvider>
        <ChartCanvas width={800} height={400}>
          <Chart
            id={1}
            yExtents={yExtents}
            height={400}
          >
            <CandleStickSeries />
            <XAxis />
            <YAxis width={800} />
          </Chart>
        </ChartCanvas>
      </ChartProvider>
    </div>
  );
}

export default App;
