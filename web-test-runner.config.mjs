// import { playwrightLauncher } from '@web/test-runner-playwright';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'test/**/*.test.js',
  nodeResolve: true,
  coverageConfig: {
    threshold: {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    }
  }
});
