import { BasePage } from "./@components";

export class NewItemPage extends BasePage {
	itemNameField = () => this.page.locator("#name");
	freestyleProjectType = () => this.page.locator(".hudson_model_FreeStyleProject");
	folderType = () => this.page.locator(".com_cloudbees_hudson_plugins_folder_Folder");
	okButton = () => this.page.locator("#ok-button");

	async fillItemNameField(name: string): Promise<this> {
		await this.itemNameField().fill(name);
		return this;
	}

	async clickFreestyleProjectType(): Promise<this> {
		await this.freestyleProjectType().click();
		return this;
	}

	async clickFolderType(): Promise<this> {
		await this.folderType().click();
		return this;
	}

	async clickOkButton(): Promise<void> {
		await this.okButton().click();
	}
}
