import { BasePage } from "./@components";

export class MultibranchPipelineRenamePage extends BasePage {    
    renameButton = () => this.page.getByRole("button", { name: "Rename" });	
    newNameField = () => this.page.locator("input[name='newName']");
    

    async clickRenameButton(): Promise<void> {
        await this.renameButton().click();
    }

    async fillNewNameField(newName: string): Promise<this> {
		await this.newNameField().fill(newName);
		return this;
	}    
}
