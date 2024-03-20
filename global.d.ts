import type { TestingLibraryMatchers } from "@testing-library/jest-dom/types/matchers";

declare global {
  namespace jest {
    interface Matchers<R = void>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}

declare module "@testing-library/jest-dom" {
  export * from "@testing-library/jest-dom";
}