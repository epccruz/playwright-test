import { test , expect, Page } from '@playwright/test';
import { LoginPage } from '../../src/page-objects/base/Login';
import path from 'path';
import fs from 'fs';

const {
  ADMIN_EMAIL = '',
  ADMIN_PW = '',
  USER_EMAIL = '',
  USER_PW = ''
} = process.env;

const userAuthFile = path.join(__dirname, '../../.auth/userstate.json');
const adminAuthFile = path.join(__dirname, '../../.auth/adminstate.json');

const isSessionValid = (authFile: string) => {
  if(fs.existsSync(authFile)){
    const userSession = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
    const sessionToken = userSession.cookies?.find((item: Record<string, any>) => item.name === 'session_token');
    if(!sessionToken) return false;
    const sessionExpiryState = sessionToken.expires * 1000 > Date.now() + 60000;
    return sessionExpiryState;
  }
  return false;
};

test('authenticate admin', async ({ page }) => {
  if(isSessionValid(adminAuthFile)) return;

  const loginPage = new LoginPage(page);
  // Perform authentication steps. Replace these actions with your own.
  await loginPage.goto();
  await loginPage.loginWithEmailAndPassword(ADMIN_EMAIL, ADMIN_PW);
  await loginPage.verifyLoginSuccessWithText('(ADMIN)');

  // End of authentication steps.

  await page.context().storageState({ path: adminAuthFile });
});


test('authenticate user', async ({ page }) => {
  if(isSessionValid(userAuthFile)) return;

  const loginPage = new LoginPage(page);
  // Perform authentication steps. Replace these actions with your own.
  await loginPage.goto();
  await loginPage.loginWithEmailAndPassword(USER_EMAIL, USER_PW);
  await loginPage.verifyLoginSuccessWithText('(USER)');

  // End of authentication steps.

  await page.context().storageState({ path: userAuthFile });
});