import { useState } from "react";

export interface CalculatorState {
  display: string;
  firstValue: string;
  operator: string;
  waiting: boolean;
  lastOperator: string;
  lastValue: string;
}

const initialState: CalculatorState = {
  display: "0",
  firstValue: "",
  operator: "",
  waiting: false,
  lastOperator: "",
  lastValue: "",
};

export const useCalculatorState = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const updateState = (updates: Partial<CalculatorState>) => {
    setState((previousState) => ({ ...previousState, ...updates }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return { state, updateState, resetState };
};
