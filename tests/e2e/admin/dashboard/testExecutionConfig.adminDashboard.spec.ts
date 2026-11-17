import { test } from '../../../../src/fixtures';
import { TestExecutionConfigForm } from '../../../../src/fixtures/types';

test('Answer test execution configuration', async ({ testExecutionPage }) => {
  const testExecutionConfigData: TestExecutionConfigForm = {
    testSuiteName: 'Production High Sample Test',
    targetEnvironmentSelect: 'prod',
    executionPriority: 'high',
    releaseNotesAndTestScope: 'Sample Test Release Notes'
  };
  await testExecutionPage.goto();

  await test.step('Answer test execution configuration', async () => {
    await testExecutionPage.answerTestExecutionConfigurationForm(testExecutionConfigData);
    await testExecutionPage.verifyConfigurationOutputContainer(testExecutionConfigData);
  });

  await test.step('Reset test execution configuration', async () => {
    await testExecutionPage.clickResetFieldsButton();
    await testExecutionPage.verifyDefaultFormState();
  });
});