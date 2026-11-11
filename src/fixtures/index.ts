// fixtures.ts
import { test as base } from '@playwright/test';
import { DashboardPage } from '../page-objects/base/Dashboard';
import { SettingsPage } from '../page-objects/base/Settings';
import { LoginPage } from '../page-objects/base/Login';
import { AsyncActionsDashboardPage } from '../page-objects/AsyncActionsDashboard';

type Pages = {
  dashboardPage: DashboardPage;
  settingsPage: SettingsPage;
  loginPage: LoginPage;
  asyncActionsPage: AsyncActionsDashboardPage;
};

export const test = base.extend<Pages>({
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  asyncActionsPage: async ({ page }, use) => {
    await use(new AsyncActionsDashboardPage(page));
  }
});
