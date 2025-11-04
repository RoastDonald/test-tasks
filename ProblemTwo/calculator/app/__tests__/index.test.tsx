import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useCalculator } from "../../hooks/useCalculator";

describe("Calculator - Core Logic", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should perform addition", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("1");
    });
    act(() => {
      result.current.handleNumberInput("0");
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

  it("should perform subtraction", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("1");
    });
    act(() => {
      result.current.handleNumberInput("0");
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

  it("should perform multiplication", () => {
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

  it("should perform division", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("2");
    });
    act(() => {
      result.current.handleNumberInput("0");
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
      result.current.handleNumberInput("1");
    });
    act(() => {
      result.current.handleNumberInput("0");
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

  it("should clear calculator", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.handleNumberInput("1");
    });
    act(() => {
      result.current.handleNumberInput("0");
    });
    act(() => {
      result.current.handleNumberInput("0");
    });
    expect(result.current.displayValue).toBe("100");

    act(() => {
      result.current.handleClear();
    });
    expect(result.current.displayValue).toBe("0");
  });
});
