import { Page } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { NewItemPage } from "./pages/NewItemPage";
import { ConfigureFreestylePage } from "./pages/ConfigureFreestylePage";
import { ConfigureFolderPage } from "./pages/ConfigureFolderPage";
import { FolderPage } from "./pages/FolderPage";

export class App {
	private _homePage: HomePage | null = null;
	private _newItemPage: NewItemPage | null = null;
	private _configureFrestylePage: ConfigureFreestylePage | null = null;
	private _configureFolderPage: ConfigureFolderPage | null = null;
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

	get configureFolderPage() {
		return (this._configureFolderPage ??= new ConfigureFolderPage(this.page));
	}

	get folderPage() {
		return (this._folderPage ??= new FolderPage(this.page));
	}
}
