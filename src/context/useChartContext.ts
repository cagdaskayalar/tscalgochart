import { useContext } from "react";
import { ChartContext } from "./ChartContext";

function useChartContext() {
  const ctx = useContext(ChartContext);
  if (!ctx) throw new Error("useChartContext must be used within a ChartProvider");
  return ctx;
}

export default useChartContext; 