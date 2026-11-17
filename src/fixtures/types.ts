export type TestExecutionConfigForm = {
  testSuiteName: string;
  targetEnvironmentSelect?: 'staging' | 'qa' | 'prod';
  executionPriority?: 'low' | 'med' | 'high';
  releaseNotesAndTestScope?: string;
};
