import { renderHook, act } from "@testing-library/react-hooks";
import { useCalculatorState, CalculatorState } from "../useCalculatorState";

describe("useCalculatorState", () => {
  it("should initialize with default state", () => {
    const { result } = renderHook(() => useCalculatorState());

    expect(result.current.state).toEqual({
      display: "0",
      firstValue: "",
      operator: "",
      waiting: false,
      lastOperator: "",
      lastValue: "",
    });
  });

  it("should update state with partial updates", () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.updateState({ display: "5" });
    });

    expect(result.current.state.display).toBe("5");
    expect(result.current.state.firstValue).toBe("");
    expect(result.current.state.operator).toBe("");
    expect(result.current.state.waiting).toBe(false);
  });

  it("should merge state updates correctly", () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.updateState({ display: "10" });
    });

    act(() => {
      result.current.updateState({ operator: "+", firstValue: "10" });
    });

    expect(result.current.state.display).toBe("10");
    expect(result.current.state.firstValue).toBe("10");
    expect(result.current.state.operator).toBe("+");
  });

  it("should update multiple properties at once", () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.updateState({
        display: "15",
        firstValue: "10",
        operator: "+",
        waiting: true,
      });
    });

    expect(result.current.state).toEqual({
      display: "15",
      firstValue: "10",
      operator: "+",
      waiting: true,
      lastOperator: "",
      lastValue: "",
    });
  });

  it("should reset state to initial state", () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.updateState({
        display: "100",
        firstValue: "50",
        operator: "*",
        waiting: true,
        lastOperator: "+",
        lastValue: "50",
      });
    });

    expect(result.current.state.display).toBe("100");

    act(() => {
      result.current.resetState();
    });

    expect(result.current.state).toEqual({
      display: "0",
      firstValue: "",
      operator: "",
      waiting: false,
      lastOperator: "",
      lastValue: "",
    });
  });

  it("should preserve unchanged properties when updating", () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.updateState({
        display: "5",
        firstValue: "3",
        operator: "+",
        waiting: false,
        lastOperator: "-",
        lastValue: "2",
      });
    });

    act(() => {
      result.current.updateState({ display: "8" });
    });

    expect(result.current.state.firstValue).toBe("3");
    expect(result.current.state.operator).toBe("+");
    expect(result.current.state.waiting).toBe(false);
    expect(result.current.state.lastOperator).toBe("-");
    expect(result.current.state.lastValue).toBe("2");
    expect(result.current.state.display).toBe("8");
  });
});
