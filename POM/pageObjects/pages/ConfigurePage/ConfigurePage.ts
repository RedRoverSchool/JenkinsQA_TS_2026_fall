import { BasePage } from "../@components";

export class ConfigurePage extends BasePage {
    
    saveButton = () => this.page.getByRole("button", { name: "Save" });

    async clickSaveButton(): Promise<void> {
        await this.saveButton().click();
    }
}
