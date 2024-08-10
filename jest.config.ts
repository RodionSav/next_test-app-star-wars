import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  // Use the V8 coverage provider, a fast JavaScript and TypeScript code coverage tool
  coverageProvider: "v8",
  // Specify the test environment that simulates the browser environment for testing components
  testEnvironment: "jsdom",
  // This option allows Jest to transform files using the babel-jest package
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  // Specify the path to the setup file where you can configure Jest's environment before each test // Ensure this path is correct
  // Configure the module name mapper to resolve paths correctly and support imports like "@/path/to/module"
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Add other Jest configurations as needed
};

// Export the Jest configuration to allow next/jest to load the Next.js configuration asynchronously
export default createJestConfig(customJestConfig);
