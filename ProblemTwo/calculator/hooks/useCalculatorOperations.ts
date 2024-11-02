import { CalculatorState } from "./useCalculatorState";

const formatNumber = (number: number): string =>
  number.toString().replace(/\.?0+$/, "");

export const useCalculatorOperations = () => {
  const calculate = (
    value1: string,
    value2: string,
    operator: string,
    currentDisplay: string
  ): string => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    if (isNaN(num1) || isNaN(num2)) return "0";
    if (operator === "/" && num2 === 0) return "Error";

    const operations: Record<string, (a: number, b: number) => number> = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    return operations[operator]
      ? formatNumber(operations[operator](num1, num2))
      : currentDisplay;
  };

  return { calculate, formatNumber };
};
