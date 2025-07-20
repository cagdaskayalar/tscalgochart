import React, { useContext } from "react";
import { ChartContext } from "../context/ChartContext";

export interface ChartCanvasProps {
  width: number;
  height: number;
  children?: React.ReactNode;
}

const ChartCanvas: React.FC<ChartCanvasProps> = ({ width, height, children }) => {
  const context = useContext(ChartContext);
  if (!context) return null;
  const { data, scaleProvider } = context;

  return (
    <svg width={width} height={height} data-count={data?.length || 0}>
      {scaleProvider && children}
    </svg>
  );
};

export default ChartCanvas; 