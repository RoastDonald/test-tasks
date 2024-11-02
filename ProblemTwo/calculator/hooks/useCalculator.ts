import { useCalculatorState } from "./useCalculatorState";
import { useCalculatorHandlers } from "./useCalculatorHandlers";

export const useCalculator = () => {
  const { state, updateState, resetState } = useCalculatorState();
  const handlers = useCalculatorHandlers({ state, updateState, resetState });

  return {
    displayValue: state.display,
    handleNumberInput: handlers.handleNumber,
    handleOperatorInput: handlers.handleOperator,
    handleEquals: handlers.handleEquals,
    handleClear: handlers.handleClear,
    handleToggleSign: handlers.handleToggleSign,
    handleDecimal: handlers.handleDecimal,
    handlePercentage: handlers.handlePercentage,
  };
};
