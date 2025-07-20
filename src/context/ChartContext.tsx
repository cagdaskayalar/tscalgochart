import { createContext } from "react";
import type { ReactNode } from "react";
import type { OHLCData } from "../utils/dataUtils";
import { useChartData } from "../hooks/useChartData";
import { discontinuousTimeScaleProvider } from "../utils/discontinuousTimeScaleProvider";

interface ChartContextType {
  data: OHLCData[] | null;
  loading: boolean;
  error: string | null;
  scaleProvider: ReturnType<typeof discontinuousTimeScaleProvider> | null;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export function ChartProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useChartData();
  const scaleProvider = data
    ? discontinuousTimeScaleProvider(data, {
        inputDateAccessor: (d: Record<string, unknown>) => (d as OHLCData).time,
      })
    : null;

  return (
    <ChartContext.Provider value={{ data, loading, error, scaleProvider }}>
      {children}
    </ChartContext.Provider>
  );
}

export { ChartContext };
