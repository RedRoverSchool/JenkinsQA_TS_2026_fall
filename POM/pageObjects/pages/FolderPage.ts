import { BasePage } from "./@components";

export class FolderPage extends BasePage {
	headingByName = (name: string) => this.page.getByRole("heading", { name });
}
