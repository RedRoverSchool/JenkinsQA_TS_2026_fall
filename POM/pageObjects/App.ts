import { Page } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { NewItemPage } from "./pages/NewItemPage";
import { ConfigureFreestylePage } from "./pages/ConfigurePage/ConfigureFreestylePage";
import { ConfigureFolderPage } from "./pages/ConfigurePage/ConfigureFolderPage";
import { ConfigureMultibranchPipelinePage } from "./pages/ConfigurePage/ConfigureMultibranchPipelinePage";
import { ConfigureMultiConfigurationPage } from "./pages/ConfigurePage/ConfigureMultiConfigurationProjectPage";
import { ConfigureOrganizationFolderPage } from "./pages/ConfigurePage/ConfigureOrganizationFolderPage";
import { FolderPage } from "./pages/FolderPage";

export class App {
	private _homePage: HomePage | null = null;
	private _newItemPage: NewItemPage | null = null;
	private _configureFrestylePage: ConfigureFreestylePage | null = null;
	private _configureMultibranchPipelinePage: ConfigureMultibranchPipelinePage | null = null;
	private _configureMultiConfigurationPage: ConfigureMultiConfigurationPage | null = null;
	private _configureFolderPage: ConfigureFolderPage | null = null;
	private _configurePipelinePage: ConfigureMultibranchPipelinePage | null = null;
	private _configureOrganizationFolderPage: ConfigureOrganizationFolderPage | null = null;
	private _folderPage: FolderPage | null = null;


	constructor(private readonly page: Page) {}

	get homePage() {
		return (this._homePage ??= new HomePage(this.page));
	}

	get newItemPage() {
		return (this._newItemPage ??= new NewItemPage(this.page));
	}

	get configureFreestylePage() {
		return (this._configureFrestylePage ??= new ConfigureFreestylePage(this.page));
	}

	get configureMultibranchPipelinePage() {
		return (this._configureMultibranchPipelinePage ??= new ConfigureMultibranchPipelinePage(this.page));
	}	
	
	get configureMultiConfigurationPage() {
		return (this._configureMultiConfigurationPage ??= new ConfigureMultiConfigurationPage(this.page));
	}	

	get configureFolderPage() {
		return (this._configureFolderPage ??= new ConfigureFolderPage(this.page));
	}	

	get configurePipelinePage() {
		return (this._configurePipelinePage ??= new ConfigureMultibranchPipelinePage(this.page));
	}

	get configureOrganizationFolderPage() {
		return (this._configureOrganizationFolderPage ??= new ConfigureOrganizationFolderPage(this.page));
	}
	
	get folderPage() {
		return (this._folderPage ??= new FolderPage(this.page));
	}
}
