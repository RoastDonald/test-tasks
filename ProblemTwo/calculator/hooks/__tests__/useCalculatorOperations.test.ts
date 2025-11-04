import { renderHook } from "@testing-library/react-hooks";
import { useCalculatorOperations } from "../useCalculatorOperations";

describe("useCalculatorOperations", () => {
  let hook: ReturnType<typeof useCalculatorOperations>;

  beforeEach(() => {
    const { result } = renderHook(() => useCalculatorOperations());
    hook = result.current;
  });

  describe("formatNumber", () => {
    it("should format whole numbers without decimal point", () => {
      expect(hook.formatNumber(5)).toBe("5");
      expect(hook.formatNumber(100)).toBe("100");
      expect(hook.formatNumber(0)).toBe("0");
    });

    it("should format numbers with decimals", () => {
      expect(hook.formatNumber(5.5)).toBe("5.5");
      expect(hook.formatNumber(10.25)).toBe("10.25");
    });

    it("should remove trailing zeros", () => {
      expect(hook.formatNumber(5.0)).toBe("5");
      expect(hook.formatNumber(10.5)).toBe("10.5");
      expect(hook.formatNumber(3.14)).toBe("3.14");
    });
  });

  describe("calculate", () => {
    it("should perform addition correctly", () => {
      expect(hook.calculate("5", "3", "+", "0")).toBe("8");
      expect(hook.calculate("10", "20", "+", "0")).toBe("30");
      expect(hook.calculate("0.5", "0.3", "+", "0")).toBe("0.8");
      expect(hook.calculate("-5", "3", "+", "0")).toBe("-2");
    });

    it("should perform subtraction correctly", () => {
      expect(hook.calculate("5", "3", "-", "0")).toBe("2");
      expect(hook.calculate("10", "20", "-", "0")).toBe("-10");
      expect(hook.calculate("5", "5", "-", "0")).toBe("0");
      expect(hook.calculate("-5", "3", "-", "0")).toBe("-8");
    });

    it("should perform multiplication correctly", () => {
      expect(hook.calculate("5", "3", "*", "0")).toBe("15");
      expect(hook.calculate("10", "0", "*", "0")).toBe("0");
      expect(hook.calculate("2.5", "4", "*", "0")).toBe("10");
      expect(hook.calculate("-5", "3", "*", "0")).toBe("-15");
    });

    it("should perform division correctly", () => {
      expect(hook.calculate("10", "2", "/", "0")).toBe("5");
      expect(hook.calculate("15", "3", "/", "0")).toBe("5");
      expect(hook.calculate("7", "2", "/", "0")).toBe("3.5");
      expect(hook.calculate("-10", "2", "/", "0")).toBe("-5");
    });

    it("should return Error when dividing by zero", () => {
      expect(hook.calculate("10", "0", "/", "0")).toBe("Error");
      expect(hook.calculate("5", "0", "/", "0")).toBe("Error");
      expect(hook.calculate("-10", "0", "/", "0")).toBe("Error");
    });

    it("should return 0 for invalid numbers", () => {
      expect(hook.calculate("abc", "5", "+", "0")).toBe("0");
      expect(hook.calculate("5", "xyz", "+", "0")).toBe("0");
      expect(hook.calculate("", "", "+", "0")).toBe("0");
    });

    it("should return currentDisplay for invalid operators", () => {
      expect(hook.calculate("5", "3", "invalid", "10")).toBe("10");
      expect(hook.calculate("5", "3", "", "10")).toBe("10");
      expect(hook.calculate("5", "3", "%", "10")).toBe("10");
    });

    it("should handle decimal results correctly", () => {
      expect(hook.calculate("1", "3", "/", "0")).toBe("0.3333333333333333");
      expect(hook.calculate("2", "3", "/", "0")).toBe("0.6666666666666666");
    });

    it("should handle large numbers", () => {
      expect(hook.calculate("999999", "1", "+", "0")).toBe("1000000");
      expect(hook.calculate("1000000", "999999", "-", "0")).toBe("1");
    });
  });
});
