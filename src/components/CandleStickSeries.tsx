import React, { useContext } from "react";
import type { OHLCData } from "../utils/dataUtils";
import { ChartContext } from "../context/ChartContext";

export interface CandleStickSeriesProps {
  data?: OHLCData[];
  xScale?: (x: number) => number;
  yScale?: (y: number) => number;
  height?: number;
  width?: number;
}

const CandleStickSeries: React.FC<CandleStickSeriesProps> = (props) => {
  const context = useContext(ChartContext);
  if (!context || !context.data || !context.scaleProvider) return null;
  
  const { data, scaleProvider } = context;
  const { xScale } = scaleProvider;
  const height = props.height || 400;
  
  // YAxis ile aynı yScale hesaplaması
  const ohlcData = data as Array<{ open: number; high: number; low: number; close: number }>;
  const allValues = ohlcData.flatMap(d => [d.open, d.high, d.low, d.close]);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  
  // yScale fonksiyonu - YAxis ile uyumlu
  const yScale = (value: number) => {
    return height - ((value - min) / (max - min)) * height;
  };
  
  console.log("CandleStickSeries data:", data.length, "items");
  console.log("Price range:", min, "to", max);
  
  const candles = data.map((d, i) => {
    const x = xScale(i);
    const open = yScale(d.open);
    const close = yScale(d.close);
    const high = yScale(d.high);
    const low = yScale(d.low);
    
    const isGreen = close < open; // SVG'de y koordinatı ters
    const color = isGreen ? "#26a69a" : "#ef5350";
    const bodyHeight = Math.abs(open - close);
    
    //console.log(`Candle ${i}: x=${x}, open=${open}, close=${close}, high=${high}, low=${low}`);
    
    return (
      <g key={i}>
        {/* Wick (fitil) */}
        <line
          x1={x}
          y1={high}
          x2={x}
          y2={low}
          stroke={color}
          strokeWidth={2}
        />
        {/* Body (gövde) */}
        <rect
          x={x - 4}
          y={isGreen ? close : open}
          width={8}
          height={Math.max(bodyHeight, 2)}
          fill={color}
          stroke={color}
        />
      </g>
    );
  });

  return (
    <g>
      <desc>
        CandleStickSeries: {data.length} data points
      </desc>
      {candles}
    </g>
  );
};

export default CandleStickSeries; 