import { Page, Locator, expect } from '@playwright/test';
import { DashboardPage } from "./base/Dashboard"
import { TestExecutionConfigForm } from '../fixtures/types';

export class TestExecutionConfigurationPage extends DashboardPage {
  testSuiteNameInput: Locator;
  targetEnvironmentSelect: Locator;
  executionPriorityRadioGroup: Locator;
  // executionPriorityLow: Locator;
  // executionPriorityMedium: Locator;
  // executionPriorityHigh: Locator;
  releaseNotesAndTestScopeInput: Locator;
  saveConfigButton: Locator;
  resetFieldsButton: Locator;
  configOutputContainer: Locator;

  constructor (page: Page) {
    super(page);
  
    this.testSuiteNameInput = page.getByRole('textbox', { name: /Test Suite Name/i});
    this.targetEnvironmentSelect = page.getByRole('combobox', { name: /Target Environment/i });
    this.executionPriorityRadioGroup = page.getByRole('group', { name: /Execution Priority/i })
    // this.executionPriorityLow = page.getByRole('radio', { name: new RegExp(/Low /i) });
    // this.executionPriorityMedium = page.getByRole('radio', { name: new RegExp(/Medium /i) });
    // this.executionPriorityHigh = page.getByRole('radio', { name: new RegExp(/High /i) });
    this.releaseNotesAndTestScopeInput = page.getByRole('textbox', { name: /Release Notes & Test Scope/i });

    this.saveConfigButton = page.getByRole('button', { name: /Save Execution Config/i });
    this.resetFieldsButton = page.getByRole('button', { name: /Reset Fields/i });
    this.configOutputContainer = page.getByTestId(/config-output-container/i);
  }

  async inputTestSuiteName (testSuiteName: TestExecutionConfigForm['testSuiteName']) {
    await this.testSuiteNameInput.fill(testSuiteName);
  }

  async selectTargetEnvironment (targetEnvironment: TestExecutionConfigForm['targetEnvironmentSelect']) {
    if(targetEnvironment) {
      const targetEnvironmentSelectValue = await this.targetEnvironmentSelect.getByText(new RegExp(targetEnvironment, 'i')).getAttribute('value');
      await this.targetEnvironmentSelect.selectOption(targetEnvironmentSelectValue);
    }
  }

  async checkExecutionPriority (executionPriority: TestExecutionConfigForm['executionPriority']) {
    if(executionPriority)
      await this.executionPriorityRadioGroup.getByRole('radio', { name: new RegExp(executionPriority,'i') }).check();
  }

  async inputReleaseNotesAndTestScope (releaseNotesAndTestScope: TestExecutionConfigForm['releaseNotesAndTestScope']) {
    if(releaseNotesAndTestScope) 
      await this.releaseNotesAndTestScopeInput.fill(releaseNotesAndTestScope);
  }

  async clickResetFieldsButton () {
    await this.resetFieldsButton.click();
  }

  async answerTestExecutionConfigurationForm ({
    testSuiteName,
    targetEnvironmentSelect,
    executionPriority,
    releaseNotesAndTestScope
  }: TestExecutionConfigForm) {
    await this.inputTestSuiteName(testSuiteName);
    await this.selectTargetEnvironment(targetEnvironmentSelect);
    await this.checkExecutionPriority(executionPriority);
    await this.inputReleaseNotesAndTestScope(releaseNotesAndTestScope);
    await this.saveConfigButton.click();
  }

  async verifyDefaultFormState () {
    await expect(this.configOutputContainer).toBeEmpty();
    await expect(this.testSuiteNameInput).toBeEmpty();
    await expect(this.releaseNotesAndTestScopeInput).toBeEmpty();
    await expect(this.targetEnvironmentSelect).toHaveValue(/staging/i);
    await expect(this.executionPriorityRadioGroup.getByRole('radio', { name: new RegExp('med','i') })).toBeChecked();
  }

  async verifyConfigurationOutputContainer ({
    testSuiteName,
    targetEnvironmentSelect = 'staging',
    executionPriority = 'med',
    releaseNotesAndTestScope = '(none)'
  }: TestExecutionConfigForm) {

    await expect(this.configOutputContainer).not.toBeEmpty();
    const outputValue = await this.configOutputContainer.textContent();

    if(outputValue) {
      const outputValueObject: Record<string,string> = JSON.parse(outputValue);
      await expect(outputValueObject.saved).toEqual(true);
      await expect(outputValueObject).toMatchObject({
        saved: true,
        suiteName: testSuiteName,
        targetEnv: targetEnvironmentSelect,
        priority: executionPriority,
        notes: releaseNotesAndTestScope
      });
    }

  }
}