import { BasePage } from "./@components";

export class HomePage extends BasePage {
	// locators
	newItemLink = () => this.page.locator("#side-panel a[href$='newJob']");
	projectStatusItemName = () => this.page.locator("#projectstatus .jenkins-table__link");
	itemLinkWithName = (itemName: string) => this.page.locator(`#job_${itemName.replaceAll(" ", "%20")} .jenkins-table__link`);

	// actions
	async clickNewItemLink(): Promise<void> {
		await this.newItemLink().click();
	}

	async clickOnItemWithName(itemName: string): Promise<void> {
		await this.itemLinkWithName(itemName).click();
	}
}
