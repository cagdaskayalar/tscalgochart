import React, { useContext } from "react";
import { ChartContext } from "../context/ChartContext";

export interface XAxisProps {
  xScale?: (x: number) => number;
  height?: number;
  width?: number;
  ticks?: number;
  data?: unknown[];
}

const XAxis: React.FC<XAxisProps> = (props) => {
  const context = useContext(ChartContext);
  if (!context || !context.scaleProvider) return null;
  
  const { scaleProvider } = context;
  const { xScale } = scaleProvider;
  const height = props.height || 400;
  const width = props.width || 800;
  const ticks = props.ticks || 10;
  const data = context.data || [];
  
  // Gerçek xScale ile tick pozisyonları hesapla
  const tickPositions = [];
  const dataLength = data.length;
  
  if (dataLength > 0) {
    for (let i = 0; i <= ticks; i++) {
      const index = Math.floor((i / ticks) * (dataLength - 1));
      const x = xScale(index);
      tickPositions.push({ x, index });
    }
  } else {
    // Veri yoksa basit tick'ler
    for (let i = 0; i <= ticks; i++) {
      const x = (width / ticks) * i;
      tickPositions.push({ x, index: i });
    }
  }

  console.log("XAxis tick positions:", tickPositions);

  return (
    <g transform={`translate(0, ${height})`} className="x-axis">
      {/* Ana çizgi */}
      <line
        x1={0}
        y1={0}
        x2={width}
        y2={0}
        stroke="#666"
        strokeWidth={1}
      />
      {/* Tick'ler */}
      {tickPositions.map(({ x, index }, i) => (
        <g key={i}>
          <line
            x1={x}
            y1={0}
            x2={x}
            y2={5}
            stroke="#666"
            strokeWidth={1}
          />
          <text
            x={x}
            y={20}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
          >
            {index}
          </text>
        </g>
      ))}
    </g>
  );
};

export default XAxis; 