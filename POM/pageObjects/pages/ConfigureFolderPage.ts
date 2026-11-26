import { ConfigurePage } from "./ConfigurePage/ConfigurePage";;

export class ConfigureFolderPage extends ConfigurePage {
	displayNameField = () => this.page.locator("input.jenkins-input.validated");

	async fillDisplayNameField(displayName: string): Promise<this> {
		await this.displayNameField().fill(displayName);
		return this;
	}
	
}
