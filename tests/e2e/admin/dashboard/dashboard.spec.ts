import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../../../src/page-objects/Dashboard';

test('test', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();
});
