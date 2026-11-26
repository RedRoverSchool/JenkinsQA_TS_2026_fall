import { test, expect, App, ItemCreationFixtures } from "@/POM/fixtures/itemCreationFixtures";
import { ItemType } from "../testData/newItemPageData";
import { newItemPageData } from "../testData/newItemPageData";
import { configureFolderPageData } from "../testData/configureFolderPageData";
import { ConfigureFolderPage } from "@/POM/pageObjects/pages/ConfigurePage/ConfigureFolderPage";


test.describe("US_01.002 | Folder", () => {
	test("TC_01.002.02 | Verify folder creation with Display Name", 
		async ({ app, createNewItem }
			: { app: App; } & ItemCreationFixtures) => {
		
		const configureFolderPage  = await createNewItem(ItemType.Folder, newItemPageData.folderName) as ConfigureFolderPage;
		await configureFolderPage.fillDisplayNameField(configureFolderPageData.displayName);
		await configureFolderPage.clickSaveButton();

		await app.folderPage.verifyUrl(new RegExp(`/job/${newItemPageData.folderName}/?$`));
		await expect(app.folderPage.headingByName(configureFolderPageData.displayName)).toBeVisible();
	});
	
	test("TC_01.002.04 | Verify creating folder", 
		async ({ app, createNewItem }
			: { app: App; } & ItemCreationFixtures) => {
		const folderName = newItemPageData.dashboardItemsNames.get(ItemType.Folder)
		const configurePage = await createNewItem(ItemType.Folder, folderName);
		await configurePage.clickSaveButton();

		await app.folderPage.verifyUrl(new RegExp(`/job/${folderName}/?$`));
	});
	
});
