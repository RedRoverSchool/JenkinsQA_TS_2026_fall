import { BasePage } from "../@components";

export class ConfigurePage extends BasePage {

    saveButton = () => this.page.getByRole("button", { name: "Save" });
    descriptionField = () => this.page.locator("textarea[name$='description']");

    async clickSaveButton(): Promise<void> {
        await this.saveButton().click();
    }

    async fillDescriptionField(description: string): Promise<this> {
        await this.descriptionField().fill(description);
        return this;
    }
}
