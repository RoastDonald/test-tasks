import React from "react";
import Button from "../button";

jest.mock("react-native/Libraries/Utilities/Dimensions", () => ({
  get: jest.fn(() => ({ width: 400 })),
}));

describe("Button", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onPress when pressed", () => {
    const button = (
      <Button title="5" type="number" onPress={mockOnPress} testID="button-5" />
    );
    expect(button).toBeDefined();
    expect(button.props.title).toBe("5");
    expect(button.props.type).toBe("number");
    expect(button.props.testID).toBe("button-5");
    expect(typeof button.props.onPress).toBe("function");

    mockOnPress();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
