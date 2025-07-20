import React, { useContext } from 'react';
import { ChartContext } from '../context/ChartContext';

export interface ChartProps {
  id: number;
  yExtents: (data: unknown[]) => [number, number] | number[];
  height?: number;
  origin?: (w: number, h: number) => [number, number];
  children?: React.ReactNode;
}

const Chart: React.FC<ChartProps> = ({ id, height = 400, origin, children }) => {
  const context = useContext(ChartContext);
  if (!context || !context.data || !context.scaleProvider) return null;
  
  // Origin hesapla
  const [originX, originY] = origin ? origin(800, height) : [0, 0];

  return (
    <g data-chart-id={id} transform={`translate(${originX}, ${originY})`}>
      {/* Chart içeriği - children'ı doğrudan render et */}
      {children}
    </g>
  );
};

export default Chart; 