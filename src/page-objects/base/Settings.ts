import { Page, Locator, expect } from "@playwright/test";

const {
  SETTINGS_PAGE = " ",
} = process.env;


export class SettingsPage {
  readonly page: Page;
  readonly settingsHeader: Locator;
  readonly frameworkConfigHeader: Locator;
  readonly recentSecurityLogsHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.settingsHeader = page.getByTestId('settings-heading');
    this.frameworkConfigHeader = page.getByRole("heading", { name: /Framework Configuration/i });
    this.recentSecurityLogsHeader = page.getByRole("heading", { name: /Recent Security Logs/i });
  }

  async goto(): Promise<void> {
    await this.page.goto(SETTINGS_PAGE);
    await expect(this.settingsHeader).toBeVisible();
  }

  async navigateToDashboardPage(): Promise<void> {
    await this.page.getByRole("link", { name: /Dashboard/i }).click();
  }
}