jest.mock("react-native/Libraries/BatchedBridge/NativeModules", () => ({}));

global.IS_REACT_ACT_ENVIRONMENT = true;
global.IS_REACT_NATIVE_TEST_ENVIRONMENT = true;
global.__DEV__ = true;
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16));

jest.mock("react-native/Libraries/Utilities/Dimensions", () => ({
  get: jest.fn(() => ({ width: 400, height: 800 })),
}));

if (typeof window !== "undefined") {
  Object.defineProperty(window, "react-native", {
    value: require("react-native-web"),
    writable: false,
  });
}
