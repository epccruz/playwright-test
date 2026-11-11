import { Page, Locator, expect } from '@playwright/test';

const { 
  LOGIN_PAGE = " ",
} = process.env;

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
      this.page = page;

    // Initialize locators
      // Inputs
      this.usernameInput = page.getByLabel(/email address/i);
      this.passwordInput = page.getByLabel(/password/i);
      // Buttons
      this.loginButton = page.getByRole('button', { name: /sign in/i });
  }

  // Actions
    // Navigate to login page
    async goto(): Promise<void> {
      await this.page.goto(LOGIN_PAGE);
      await expect(this.usernameInput).toBeVisible();
    }

    async loginWithEmailAndPassword(username: string, password: string): Promise<void> {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }

    async verifyLoginSuccessWithText(text: string): Promise<void> {
      await expect(this.page.getByText(text)).toBeVisible();
    }
}