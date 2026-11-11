import { Page, Locator, expect } from '@playwright/test';

const {
  DASHBOARD_PAGE = " ",
} = process.env;

export class DashboardPage {
  readonly page: Page;
  readonly welcomeBanner: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    // Texts
    this.welcomeBanner = page.getByText(/welcome back/i);
    // Inputs
    // Buttons
  }

  async goto(): Promise<void> {
    await this.page.goto(DASHBOARD_PAGE);
    await expect(this.welcomeBanner).toBeVisible();
  }
}