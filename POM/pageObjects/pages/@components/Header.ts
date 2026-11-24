import { Page } from "@playwright/test";

export class Header {
	constructor(private readonly page: Page) {}

	// locators
	logoLink = () => this.page.locator(".app-jenkins-logo");

	// actions
	async clickLogo(): Promise<void> {
		await this.logoLink().click();
	}
}
