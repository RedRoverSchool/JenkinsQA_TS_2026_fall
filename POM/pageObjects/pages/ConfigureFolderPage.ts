import { BasePage } from "./@components";

export class ConfigureFolderPage extends BasePage {
	displayNameField = () => this.page.locator("input.jenkins-input.validated");
	saveButton = () => this.page.getByRole("button", { name: "Save" });

	async fillDisplayNameField(displayName: string): Promise<this> {
		await this.displayNameField().fill(displayName);
		return this;
	}

	async clickSaveButton(): Promise<void> {
		await this.saveButton().click();
	}
}
