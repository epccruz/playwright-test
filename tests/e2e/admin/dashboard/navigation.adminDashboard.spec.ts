import { test } from '../../../../src/fixtures';
import { expect } from '@playwright/test';
import { forceExpireSession } from '../../../../src/utils/helper';

test('dashboard view', async ({ dashboardPage }) => {
  await dashboardPage.goto();
  await expect(dashboardPage.welcomeBannerSection).toBeVisible();
  await expect(dashboardPage.asyncActionsSection).toBeVisible();
  await expect(dashboardPage.projectItemsSection).toBeVisible();
  await expect(dashboardPage.testExecutionConfiguration).toBeVisible();
});

test('dashboard navigation to settings', async ({ dashboardPage, settingsPage }) => {
  await dashboardPage.goto();
  await dashboardPage.navigateToSettingsPage();
  await expect(settingsPage.settingsHeader).toBeVisible();
});

test('session expired', async ({ dashboardPage }) => {
  await dashboardPage.goto();
  await expect(dashboardPage.welcomeBannerSection).toBeVisible();

  await forceExpireSession(dashboardPage.page);
  await dashboardPage.page.reload();
  await expect(dashboardPage.page.getByText('Sign In to Platform')).toBeVisible();

  // app should behave as logged out / expired
});