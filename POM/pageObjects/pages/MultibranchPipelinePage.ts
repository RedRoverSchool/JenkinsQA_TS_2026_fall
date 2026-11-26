import { BasePage } from "./@components";

export class MultibranchPipelinePage extends BasePage {    
    renameButton = () => this.page.getByRole("link", { name: "Rename" });	
    

    async clickRenameButton(): Promise<void> {
        await this.renameButton().click();
    }    
}
