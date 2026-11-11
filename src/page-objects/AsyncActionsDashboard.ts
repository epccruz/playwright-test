import { Page, expect, Locator } from "@playwright/test";
import { DashboardPage } from "./base/Dashboard";

export class AsyncActionsDashboardPage extends DashboardPage {
  readonly simulateAsyncOperationButton: Locator;
  readonly fetchMetricsApiButton: Locator;
  readonly asyncResultOperationContainer: Locator;
  readonly apiMetricsResultContainer: Locator;
  readonly asyncSpinner: Locator;

  constructor(page: Page) {
    super(page);
    
    // Elements
    this.asyncResultOperationContainer = page.getByTestId(/async-result-container/i);
    this.asyncSpinner = page.locator("#async-spinner");
    this.apiMetricsResultContainer = page.getByTestId(/api-result-container/i);
    // Buttons
    this.simulateAsyncOperationButton = page.getByTestId(/trigger-async-btn/i);
    this.fetchMetricsApiButton = page.getByRole('button', { name: /Fetch Metrics API/i });
  }
  
  async triggerAsyncOperation(): Promise<void> {
    await expect(this.asyncSpinner).not.toBeVisible();
    await this.simulateAsyncOperationButton.click();
  }

  async assertAsyncOperationState(): Promise<void> {
    await Promise.all([
      expect(this.simulateAsyncOperationButton).toHaveText(/processing latency/i),
      expect(this.simulateAsyncOperationButton).toBeDisabled(),
      expect(this.asyncSpinner).toBeVisible(),
    ]);

    await expect(this.asyncResultOperationContainer).toBeVisible();
    await expect(this.asyncSpinner).not.toBeVisible();
    await expect(this.asyncResultOperationContainer).toHaveText(/successfully/i);
    await expect(this.simulateAsyncOperationButton).toHaveText(/simulate async operation/i);
  }

  async fetchMetricsApi(): Promise<void> {
    await this.fetchMetricsApiButton.click();
  }

  async assertMetricsApiResult(response: string): Promise<void> {
    await expect(this.apiMetricsResultContainer).toBeVisible();
    await expect(this.apiMetricsResultContainer).toHaveText(new RegExp(response));
  }
}