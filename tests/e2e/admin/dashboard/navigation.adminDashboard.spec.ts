import { test } from '../../../../src/fixtures';
import { expect } from '@playwright/test';

test('dashboard view', async ({ dashboardPage }) => {
  await dashboardPage.goto();
  await expect(dashboardPage.welcomeBannerSection).toBeVisible();
  await expect(dashboardPage.asyncActionsSection).toBeVisible();
  await expect(dashboardPage.projectItemsSection).toBeVisible();
});

test('dashboard navigation to settings', async ({ dashboardPage, settingsPage }) => {
  await dashboardPage.goto();
  await dashboardPage.navigateToSettingsPage();
  await expect(settingsPage.settingsHeader).toBeVisible();
});