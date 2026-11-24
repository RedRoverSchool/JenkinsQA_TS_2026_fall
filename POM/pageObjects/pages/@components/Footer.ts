import { Page } from "@playwright/test";

export class Footer {
	constructor(private readonly page: Page) {}

	jenkinsVersionButton = () => this.page.locator("button.jenkins_ver");
	jenkinsVersionPopup = () => this.page.locator("div[id^='tippy-']");

	async clickJenkinsVersionButton(): Promise<this> {
		await this.jenkinsVersionButton().click();
		await this.jenkinsVersionPopup().waitFor({ state: "visible" });
		return this;
	}
}
