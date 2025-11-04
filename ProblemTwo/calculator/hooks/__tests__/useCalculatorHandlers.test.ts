import { renderHook, act } from "@testing-library/react-hooks";
import { useCalculatorHandlers } from "../useCalculatorHandlers";
import { CalculatorState } from "../useCalculatorState";

jest.mock("../useCalculatorOperations", () => ({
  useCalculatorOperations: () => ({
    calculate: (v1: string, v2: string, op: string) => {
      const num1 = parseFloat(v1);
      const num2 = parseFloat(v2);
      if (isNaN(num1) || isNaN(num2)) return "0";
      if (op === "/" && num2 === 0) return "Error";

      const ops: Record<string, (a: number, b: number) => number> = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
      };

      return ops[op] ? ops[op](num1, num2).toString() : "0";
    },
    formatNumber: (num: number) => num.toString().replace(/\.?0+$/, ""),
  }),
}));

describe("useCalculatorHandlers", () => {
  const mockUpdateState = jest.fn();
  const mockResetState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("handleNumber", () => {
    it("should append number to display when display is not zero and not waiting", () => {
      const state: CalculatorState = {
        display: "5",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleNumber("3");
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "53",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      });
    });

    it("should replace display when waiting is true", () => {
      const state: CalculatorState = {
        display: "10",
        firstValue: "5",
        operator: "+",
        waiting: true,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleNumber("7");
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "7",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      });
    });

    it("should replace display when display is zero", () => {
      const state: CalculatorState = {
        display: "0",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleNumber("5");
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "5",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      });
    });
  });

  describe("handleOperator", () => {
    it("should set operator and firstValue when no pending operation", () => {
      const state: CalculatorState = {
        display: "10",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleOperator("+");
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "10",
        firstValue: "10",
        operator: "+",
        waiting: true,
        lastOperator: "+",
        lastValue: "10",
      });
    });

    it("should calculate and set result when there is pending operation", () => {
      const state: CalculatorState = {
        display: "5",
        firstValue: "10",
        operator: "+",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleOperator("*");
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "15",
        firstValue: "15",
        operator: "*",
        waiting: true,
        lastOperator: "*",
        lastValue: "5",
      });
    });

    it("should not calculate when waiting is true", () => {
      const state: CalculatorState = {
        display: "10",
        firstValue: "5",
        operator: "+",
        waiting: true,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleOperator("*");
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "10",
        firstValue: "10",
        operator: "*",
        waiting: true,
        lastOperator: "*",
        lastValue: "10",
      });
    });
  });

  describe("handleEquals", () => {
    it("should calculate result when firstValue and operator exist", () => {
      const state: CalculatorState = {
        display: "5",
        firstValue: "10",
        operator: "+",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleEquals();
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "15",
        firstValue: "15",
        operator: "",
        waiting: true,
        lastOperator: "+",
        lastValue: "5",
      });
    });

    it("should repeat last operation when no operator but lastOperator exists", () => {
      const state: CalculatorState = {
        display: "10",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "+",
        lastValue: "5",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleEquals();
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "15",
        firstValue: "10",
        waiting: true,
      });
    });

    it("should not do anything when display is Error and repeating operation", () => {
      const state: CalculatorState = {
        display: "Error",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "+",
        lastValue: "5",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleEquals();
      });

      expect(mockUpdateState).not.toHaveBeenCalled();
    });

    it("should not do anything when no firstValue and no lastOperator", () => {
      const state: CalculatorState = {
        display: "10",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleEquals();
      });

      expect(mockUpdateState).not.toHaveBeenCalled();
    });
  });

  describe("handleClear", () => {
    it("should call resetState", () => {
      const state: CalculatorState = {
        display: "100",
        firstValue: "50",
        operator: "*",
        waiting: true,
        lastOperator: "+",
        lastValue: "50",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleClear();
      });

      expect(mockResetState).toHaveBeenCalledTimes(1);
      expect(mockUpdateState).not.toHaveBeenCalled();
    });
  });

  describe("handleToggleSign", () => {
    it("should add negative sign to positive number", () => {
      const state: CalculatorState = {
        display: "5",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleToggleSign();
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "-5",
      });
    });

    it("should remove negative sign from negative number", () => {
      const state: CalculatorState = {
        display: "-5",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleToggleSign();
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "5",
      });
    });

    it("should not change display when display is zero", () => {
      const state: CalculatorState = {
        display: "0",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleToggleSign();
      });

      expect(mockUpdateState).not.toHaveBeenCalled();
    });

    it("should not change display when display is Error", () => {
      const state: CalculatorState = {
        display: "Error",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleToggleSign();
      });

      expect(mockUpdateState).not.toHaveBeenCalled();
    });
  });

  describe("handleDecimal", () => {
    it("should add decimal point to display when not present", () => {
      const state: CalculatorState = {
        display: "5",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleDecimal();
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "5.",
      });
    });

    it("should not add decimal point when already present", () => {
      const state: CalculatorState = {
        display: "5.5",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleDecimal();
      });

      expect(mockUpdateState).not.toHaveBeenCalled();
    });

    it("should set display to '0.' when waiting is true", () => {
      const state: CalculatorState = {
        display: "10",
        firstValue: "",
        operator: "",
        waiting: true,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handleDecimal();
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "0.",
        waiting: false,
      });
    });
  });

  describe("handlePercentage", () => {
    it("should convert number to percentage", () => {
      const state: CalculatorState = {
        display: "50",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handlePercentage();
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "0.5",
        waiting: true,
      });
    });

    it("should handle decimal percentages", () => {
      const state: CalculatorState = {
        display: "0.25",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handlePercentage();
      });

      expect(mockUpdateState).toHaveBeenCalledWith({
        display: "0.0025",
        waiting: true,
      });
    });

    it("should not update when display is not a valid number", () => {
      const state: CalculatorState = {
        display: "abc",
        firstValue: "",
        operator: "",
        waiting: false,
        lastOperator: "",
        lastValue: "",
      };

      const { result } = renderHook(() =>
        useCalculatorHandlers({
          state,
          updateState: mockUpdateState,
          resetState: mockResetState,
        })
      );

      act(() => {
        result.current.handlePercentage();
      });

      expect(mockUpdateState).not.toHaveBeenCalled();
    });
  });
});
