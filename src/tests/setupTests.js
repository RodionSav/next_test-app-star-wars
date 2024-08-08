import "@testing-library/jest-dom/extend-expect";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
