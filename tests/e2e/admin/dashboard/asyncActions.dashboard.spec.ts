import { Page, test, expect } from '@playwright/test';
import { AsyncActionsDashboardPage } from '../../../../src/page-objects/AsyncActionsDashboard';

async function gotoAsyncActionsDashboard(page: Page) {
  const asyncActionsSection = new AsyncActionsDashboardPage(page);
  await asyncActionsSection.goto();
  return asyncActionsSection;
}

test('Simulate Async Operation', async ({ page }) => {
  const asyncActionsPage = await gotoAsyncActionsDashboard(page);
  await asyncActionsPage.triggerAsyncOperation();
  await asyncActionsPage.assertAsyncOperationState();

});

test('Fetch Metrics API Unmocked', async ({ page }) => {
  const asyncActionsPage = await gotoAsyncActionsDashboard(page);
  await asyncActionsPage.fetchMetricsApi();
  await asyncActionsPage.assertMetricsApiResult('status": 404');
});

test('Fetch Metrics API Mocked', async ({ page }) => {
  const asyncActionsPage = await gotoAsyncActionsDashboard(page);
  await page.route('**/api/v1/metrics', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 200,
        mocked: true,
      }),
    });
  });
  await asyncActionsPage.fetchMetricsApi();
  await asyncActionsPage.assertMetricsApiResult('status": 200');
});