import { Page, Locator, expect } from '@playwright/test';

const {
  DASHBOARD_PAGE = " ",
} = process.env;

export class DashboardPage {
  readonly page: Page;
  readonly welcomeBannerSection: Locator;
  readonly asyncActionsSection: Locator;
  readonly projectItemsSection: Locator;
  readonly testExecutionConfiguration: Locator;

  constructor(page: Page) {
    this.page = page;

    this.welcomeBannerSection = page.getByText(/welcome back/i);
    // Sections
    this.asyncActionsSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: /Async Actions & Network Mocking/i }),
    });

    this.testExecutionConfiguration = page.locator('section').filter({
      has: page.getByRole('heading', { name: /Test Execution Configuration/i }),
    });

    this.projectItemsSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: /Project Items & Records/i }),
    });
  }

  async goto(): Promise<void> {
    await this.page.goto(DASHBOARD_PAGE);
    await expect(this.welcomeBannerSection).toBeVisible();
    
  }

  async navigateToSettingsPage(): Promise<void> {
    await this.page.getByRole('link', { name: /System Settings & Logs/i }).click();
  }
}