import { test } from '../../../../src/fixtures';

test('Simulate Async Operation', async ({ asyncActionsPage }) => {
  await asyncActionsPage.goto();
  await asyncActionsPage.triggerAsyncOperation();
  await asyncActionsPage.assertAsyncOperationState();
});

test('Fetch Metrics API Unmocked', async ({ asyncActionsPage }) => {
  await asyncActionsPage.goto();
  await asyncActionsPage.fetchMetricsApi();
  await asyncActionsPage.assertMetricsApiResult('status": 404');
});

test('Fetch Metrics API Mocked', async ({ asyncActionsPage }) => {
  await asyncActionsPage.goto();
  await asyncActionsPage.mockMetricsApi(200, { status: 200, message: 'Metrics API response mocked successfully' });
  await asyncActionsPage.fetchMetricsApi();
  await asyncActionsPage.assertMetricsApiResult('status": 200');
});