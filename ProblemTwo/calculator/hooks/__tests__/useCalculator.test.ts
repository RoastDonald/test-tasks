import { renderHook, act } from "@testing-library/react-hooks";
import { useCalculator } from "../useCalculator";

describe("useCalculator", () => {
  it("should initialize with default display value", () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.displayValue).toBe("0");
  });

  it("should provide all handler functions", () => {
    const { result } = renderHook(() => useCalculator());

    expect(typeof result.current.handleNumberInput).toBe("function");
    expect(typeof result.current.handleOperatorInput).toBe("function");
    expect(typeof result.current.handleEquals).toBe("function");
    expect(typeof result.current.handleClear).toBe("function");
    expect(typeof result.current.handleToggleSign).toBe("function");
    expect(typeof result.current.handleDecimal).toBe("function");
    expect(typeof result.current.handlePercentage).toBe("function");
  });

  it("should handle number input", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("5");
    });

    expect(result.current.displayValue).toBe("5");
  });

  it("should handle multiple number inputs", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("1");
    });
    act(() => {
      result.current.handleNumberInput("2");
    });
    act(() => {
      result.current.handleNumberInput("3");
    });

    expect(result.current.displayValue).toBe("123");
  });

  it("should handle operator input", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("10");
    });
    act(() => {
      result.current.handleOperatorInput("+");
    });
    act(() => {
      result.current.handleNumberInput("5");
    });

    expect(result.current.displayValue).toBe("5");
  });

  it("should perform calculation with equals", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("10");
    });
    act(() => {
      result.current.handleOperatorInput("+");
    });
    act(() => {
      result.current.handleNumberInput("5");
    });
    act(() => {
      result.current.handleEquals();
    });

    expect(result.current.displayValue).toBe("15");
  });

  it("should handle subtraction", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("10");
    });
    act(() => {
      result.current.handleOperatorInput("-");
    });
    act(() => {
      result.current.handleNumberInput("3");
    });
    act(() => {
      result.current.handleEquals();
    });

    expect(result.current.displayValue).toBe("7");
  });

  it("should handle multiplication", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("5");
    });
    act(() => {
      result.current.handleOperatorInput("*");
    });
    act(() => {
      result.current.handleNumberInput("4");
    });
    act(() => {
      result.current.handleEquals();
    });

    expect(result.current.displayValue).toBe("20");
  });

  it("should handle division", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("20");
    });
    act(() => {
      result.current.handleOperatorInput("/");
    });
    act(() => {
      result.current.handleNumberInput("4");
    });
    act(() => {
      result.current.handleEquals();
    });

    expect(result.current.displayValue).toBe("5");
  });

  it("should handle division by zero", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("10");
    });
    act(() => {
      result.current.handleOperatorInput("/");
    });
    act(() => {
      result.current.handleNumberInput("0");
    });
    act(() => {
      result.current.handleEquals();
    });

    expect(result.current.displayValue).toBe("Error");
  });

  it("should handle clear", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("100");
    });
    act(() => {
      result.current.handleOperatorInput("+");
    });
    act(() => {
      result.current.handleClear();
    });

    expect(result.current.displayValue).toBe("0");
  });

  it("should handle toggle sign", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("5");
    });
    act(() => {
      result.current.handleToggleSign();
    });

    expect(result.current.displayValue).toBe("-5");

    act(() => {
      result.current.handleToggleSign();
    });

    expect(result.current.displayValue).toBe("5");
  });

  it("should handle decimal input", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("5");
    });
    act(() => {
      result.current.handleDecimal();
    });

    expect(result.current.displayValue).toBe("5.");
  });

  it("should handle percentage", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("50");
    });
    act(() => {
      result.current.handlePercentage();
    });

    expect(result.current.displayValue).toBe("0.5");
  });

  it("should chain multiple operations", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("10");
    });
    act(() => {
      result.current.handleOperatorInput("+");
    });
    act(() => {
      result.current.handleNumberInput("5");
    });
    act(() => {
      result.current.handleOperatorInput("*");
    });
    act(() => {
      result.current.handleNumberInput("2");
    });
    act(() => {
      result.current.handleEquals();
    });

    expect(result.current.displayValue).toBe("30");
  });

  it("should repeat last operation with equals", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("10");
    });
    act(() => {
      result.current.handleOperatorInput("+");
    });
    act(() => {
      result.current.handleNumberInput("5");
    });
    act(() => {
      result.current.handleEquals();
    });
    expect(result.current.displayValue).toBe("15");

    act(() => {
      result.current.handleEquals();
    });
    expect(result.current.displayValue).toBe("20");
  });
});
