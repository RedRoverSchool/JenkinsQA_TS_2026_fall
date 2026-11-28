import { BasePage } from "./@components";
import { ItemType } from "@/POM/fixtures/itemCreationFixtures";

export class NewItemPage extends BasePage {
	itemNameField = () => this.page.locator("#name");

	validationMessage = () => this.page.locator(".error");

	itemType = (itemType: ItemType) => this.page.getByText(itemType, { exact: true });
	freestyleProjectType = () => this.page.locator(".hudson_model_FreeStyleProject");
	folderType = () => this.page.locator(".com_cloudbees_hudson_plugins_folder_Folder");
	duplicateItemOption = () => this.page.locator("#duplicate-job");
	duplicateItemField = () => this.page.getByPlaceholder("Type to autocomplete");
	duplicateItemDropdownOption = (itemName: string) => this.page.locator(".jenkins-dropdown__item").filter({ hasText: itemName });

	okButton = () => this.page.locator("#ok-button");

	async fillItemNameField(name: string): Promise<this> {
		await this.itemNameField().fill(name);
		return this;
	}

	async clickItemType(itemType: ItemType): Promise<this> {
		await this.itemType(itemType).click();
		return this;
	}

	async clickFolderType(): Promise<this> {
		await this.folderType().click();
		return this;
	}

	async clickDuplicateItemOption(): Promise<this> {
		await this.duplicateItemOption().click();
		return this;
	}

	async fillDuplicateItemField(itemName: string): Promise<this> {
		await this.duplicateItemField().fill(itemName);
		return this;
	}

	async clickDuplicateItemDropdownOption(itemName: string): Promise<this> {
		await this.duplicateItemDropdownOption(itemName).click();
		return this;
	}

	async clickOkButton(): Promise<void> {
		await this.okButton().click();
	}

	async submitFormByKeyboard(): Promise<void> {
		await this.page.press("#createItem", "Enter");
	}

}
