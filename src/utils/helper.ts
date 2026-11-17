import { Page } from '@playwright/test';

export const forceExpireSession = async (page: Page) => {
  // clear cookies on page browser where to test
  await page.context().clearCookies();

  await page.addInitScript(() => {
    // clean storage before app runs
    localStorage.clear();
    sessionStorage.clear();
  })
}