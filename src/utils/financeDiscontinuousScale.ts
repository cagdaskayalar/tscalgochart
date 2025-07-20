import { scaleLinear } from "d3-scale";
import type { ScaleLinear } from "d3-scale";

export interface FinanceDiscontinuousScale {
  (x: number): number;
  invert(x: number): number;
  domain(x?: [number, number]): [number, number];
  range(x?: [number, number]): [number, number];
  copy(): FinanceDiscontinuousScale;
}

function isNumberTuple(val: unknown): val is [number, number] {
  return Array.isArray(val) && val.length === 2 && typeof val[0] === "number" && typeof val[1] === "number";
}

function asNumberTuple(val: unknown): [number, number] {
  if (isNumberTuple(val)) {
    return val;
  }
  throw new Error("Expected a [number, number] tuple");
}

export default function financeDiscontinuousScale(
  index: unknown,
  futureProvider?: unknown,
  backingLinearScale: ScaleLinear<number, number> = scaleLinear()
): FinanceDiscontinuousScale {
  // TODO: Gerçek implementasyon eklenecek
  const scale = ((x: number) => backingLinearScale(x)) as FinanceDiscontinuousScale;
  scale.invert = (x: number) => backingLinearScale.invert(x);
  scale.domain = (x?: [number, number]) =>
    x ? (backingLinearScale.domain(x) as unknown as [number, number]) : asNumberTuple(backingLinearScale.domain() as unknown);
  scale.range = (x?: [number, number]) =>
    x ? (backingLinearScale.range(x) as unknown as [number, number]) : asNumberTuple(backingLinearScale.range() as unknown);
  scale.copy = () => financeDiscontinuousScale(index, futureProvider, backingLinearScale.copy());
  return scale;
} 