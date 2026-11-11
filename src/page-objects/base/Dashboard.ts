import { Page, Locator, expect } from '@playwright/test';

const {
  DASHBOARD_PAGE = " ",
} = process.env;

export class DashboardPage {
  readonly page: Page;
  readonly welcomeBannerSection: Locator;
  readonly asyncActionsSection: Locator;
  readonly projectItemsSection: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sections
    this.welcomeBannerSection = page.getByText(/welcome back/i);
    this.asyncActionsSection = page.getByText(/Async Actions & Network Mocking/i);
    this.projectItemsSection = page.getByText(/Project Items & Records/i);
  }

  async goto(): Promise<void> {
    await this.page.goto(DASHBOARD_PAGE);
    await expect(this.welcomeBannerSection).toBeVisible();
  }
}