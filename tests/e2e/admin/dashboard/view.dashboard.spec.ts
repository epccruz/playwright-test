import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../../../src/page-objects/base/Dashboard';

test('dashboard view', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();

  await expect(dashboardPage.welcomeBannerSection).toBeVisible();
  await expect(dashboardPage.asyncActionsSection).toBeVisible();
  await expect(dashboardPage.projectItemsSection).toBeVisible();
});
