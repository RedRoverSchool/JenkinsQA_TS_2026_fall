import { Page } from "@playwright/test";

export class Header {
	constructor(private readonly page: Page) { }

	// locators
	logoLink = () => this.page.locator(".app-jenkins-logo");

	// actions
	async clickLogo(): Promise<void> {
		await this.logoLink().click();
	}

	//right nav-bar icons
	searchActionLink = () => this.page.locator("#root-action-SearchAction");
	searchIcon = () => this.searchActionLink().locator("svg");

	async clickSearchAction(): Promise<void> {
		await this.searchActionLink().click();
	}
	async hoverSearchAction(): Promise<void> {
		await this.searchActionLink().hover();
	}

	manageJenkinsActionLink = () => this.page.locator("#root-action-ManageJenkinsAction");
	manageJenkinsIcon = () => this.manageJenkinsActionLink().locator("svg");

	async clickManageJenkinsAction(): Promise<void> {
		await this.manageJenkinsActionLink().click();
	}
	async hoverManageJenkinsAction(): Promise<void> {
		await this.manageJenkinsActionLink().hover();
	}

	userActionLink = () => this.page.locator("#root-action-UserAction");
	userIcon = () => this.userActionLink().locator("svg");

	async clickUserAction(): Promise<void> {
		await this.userActionLink().click();
	}
	async hoverUserAction(): Promise<void> {
		await this.userActionLink().hover();
	}
}
