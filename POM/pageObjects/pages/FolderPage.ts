import { BasePage } from "./@components";

export class FolderPage extends BasePage {
	headingByName = (name: string) => this.page.getByRole("heading", { name });
	deleteFolderButton = () => this.page.getByRole("link", { name: "Delete Folder" });	
	confirmDeleteButton = () => this.page.getByRole("button", { name: "Yes" });

	async clickDeleteFolderButton(): Promise<void> {
		await this.deleteFolderButton().click();
	}

	async clickConfirmDeleteButton(): Promise<void> {
		await this.confirmDeleteButton().click();
	}
}
