import React, { useContext } from "react";
import { ChartContext } from "../context/ChartContext";

export interface YAxisProps {
  yScale?: (y: number) => number;
  height?: number;
  width?: number;
  ticks?: number;
  data?: unknown[];
}

const YAxis: React.FC<YAxisProps> = (props) => {
  const context = useContext(ChartContext);
  if (!context || !context.scaleProvider) return null;
  
  const height = props.height || 400;
  const width = props.width || 800;
  const ticks = props.ticks || 10;
  const data = context.data || [];
  
  // Gerçek yScale ile tick pozisyonları hesapla
  const tickPositions = [];
  
  if (data.length > 0) {
    // OHLC verilerinden min/max hesapla
    const ohlcData = data as Array<{ open: number; high: number; low: number; close: number }>;
    const allValues = ohlcData.flatMap(d => [d.open, d.high, d.low, d.close]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    
    for (let i = 0; i <= ticks; i++) {
      const value = min + (i / ticks) * (max - min);
      const y = (height / ticks) * (ticks - i); // Basit y pozisyonu
      tickPositions.push({ y, value });
    }
  } else {
    // Veri yoksa basit tick'ler
    for (let i = 0; i <= ticks; i++) {
      const y = (height / ticks) * i;
      tickPositions.push({ y, value: ticks - i });
    }
  }

  return (
    <g className="y-axis" transform={`translate(${width}, 0)`}>
      {/* Ana çizgi */}
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={height}
        stroke="#666"
        strokeWidth={1}
      />
      {/* Tick'ler */}
      {tickPositions.map(({ y, value }, i) => (
        <g key={i}>
          <line
            x1={0}
            y1={y}
            x2={-5}
            y2={y}
            stroke="#666"
            strokeWidth={1}
          />
          <text
            x={-15}
            y={y + 4}
            textAnchor="end"
            fontSize="12"
            fill="#666"
          >
            {typeof value === 'number' ? value.toFixed(2) : value}
          </text>
        </g>
      ))}
    </g>
  );
};

export default YAxis; 