// fixtures.ts
import { test as base, Page } from '@playwright/test';
import { DashboardPage } from '../page-objects/base/Dashboard';
import { SettingsPage } from '../page-objects/base/Settings';
import { LoginPage } from '../page-objects/base/Login';
import { AsyncActionsDashboardPage } from '../page-objects/AsyncActionsDashboard';
import { TestExecutionConfigurationPage } from '../page-objects/TestExecutionConfiguration';

type Pages = {
  dashboardPage: DashboardPage;
  settingsPage: SettingsPage;
  loginPage: LoginPage;
  asyncActionsPage: AsyncActionsDashboardPage;
  testExecutionPage: TestExecutionConfigurationPage;
};

const mockMetrics = async(page: Page) => {
    await page.route('**/api/v1/metrics', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ total: 42, status: 'ok' }),
      });
    });
    return page;
};

export const test = base.extend<Pages>({
  dashboardPage: async ({ page }, use) => {
    // IF YOU WANT TO MOCK API BEFORE PAGE LOADS (e.g. long loading APIs)
    // const mockedPage = await mockMetrics(page);
    await use(new DashboardPage(page)); // change to mockedPage
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  asyncActionsPage: async ({ page }, use) => {
    await use(new AsyncActionsDashboardPage(page));
  },
  testExecutionPage: async ({ page }, use) => {
    await use(new TestExecutionConfigurationPage(page));
  }
});
