import { test , expect } from '@playwright/test';
import { LoginPage } from '../../src/page-objects/base/Login';
import path from 'path';

const {
  ADMIN_EMAIL = " ",
  ADMIN_PW = " ",
  USER_EMAIL = " ",
  USER_PW = " "
} = process.env;

const userAuthFile = path.join(__dirname, '../../.auth/userState.json');
const adminAuthFile = path.join(__dirname, '../../.auth/adminState.json');

test('authenticate admin', async ({ page }) => {

  const loginPage = new LoginPage(page);
  // Perform authentication steps. Replace these actions with your own.
  await loginPage.goto();
  await loginPage.loginWithEmailAndPassword(ADMIN_EMAIL, ADMIN_PW);
  await loginPage.verifyLoginSuccessWithText('(ADMIN');

  // End of authentication steps.

  await page.context().storageState({ path: adminAuthFile });
});


test('authenticate user', async ({ page }) => {

  const loginPage = new LoginPage(page);
  // Perform authentication steps. Replace these actions with your own.
  await loginPage.goto();
  await loginPage.loginWithEmailAndPassword(USER_EMAIL, USER_PW);
  await loginPage.verifyLoginSuccessWithText('(USER)');

  // End of authentication steps.

  await page.context().storageState({ path: userAuthFile });
});