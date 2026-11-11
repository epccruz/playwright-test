import { test } from '@playwright/test';
import { DashboardPage } from '../../../../src/page-objects/base/Dashboard';

test('test', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();
});
