import { CalculatorState } from "./useCalculatorState";
import { useCalculatorOperations } from "./useCalculatorOperations";

interface UseCalculatorHandlersProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  resetState: () => void;
}

export const useCalculatorHandlers = ({
  state,
  updateState,
  resetState,
}: UseCalculatorHandlersProps) => {
  const { calculate, formatNumber } = useCalculatorOperations();

  const handleNumber = (numberInput: string) => {
    const shouldResetDisplay = state.waiting;
    const isDisplayZero = state.display === "0";
    updateState({
      display: shouldResetDisplay
        ? numberInput
        : isDisplayZero
        ? numberInput
        : state.display + numberInput,
      waiting: false,
      lastOperator: "",
      lastValue: "",
    });
  };

  const handleOperator = (operator: string) => {
    const hasPendingOperation =
      state.firstValue && state.operator && !state.waiting;
    const calculationResult = hasPendingOperation
      ? calculate(
          state.firstValue,
          state.display,
          state.operator,
          state.display
        )
      : null;
    updateState({
      display: calculationResult || state.display,
      firstValue: calculationResult || state.display,
      operator: operator,
      waiting: true,
      lastOperator: operator,
      lastValue: state.display,
    });
  };

  const handleEquals = () => {
    if (state.firstValue && state.operator) {
      const calculationResult = calculate(
        state.firstValue,
        state.display,
        state.operator,
        state.display
      );
      updateState({
        display: calculationResult,
        firstValue: calculationResult,
        operator: "",
        waiting: true,
        lastOperator: state.operator,
        lastValue: state.display,
      });
    } else if (
      state.lastOperator &&
      state.lastValue &&
      state.display !== "Error"
    ) {
      updateState({
        display: calculate(
          state.display,
          state.lastValue,
          state.lastOperator,
          state.display
        ),
        firstValue: state.display,
        waiting: true,
      });
    }
  };

  const handleClear = () => {
    resetState();
  };

  const handleToggleSign = () => {
    if (state.display === "0" || state.display === "Error") return;
    updateState({
      display: state.display.startsWith("-")
        ? state.display.slice(1)
        : "-" + state.display,
    });
  };

  const handleDecimal = () => {
    if (state.waiting) updateState({ display: "0.", waiting: false });
    else if (!state.display.includes("."))
      updateState({ display: state.display + "." });
  };

  const handlePercentage = () => {
    const numericValue = parseFloat(state.display);
    if (!isNaN(numericValue))
      updateState({
        display: formatNumber(numericValue / 100),
        waiting: true,
      });
  };

  return {
    handleNumber,
    handleOperator,
    handleEquals,
    handleClear,
    handleToggleSign,
    handleDecimal,
    handlePercentage,
  };
};
