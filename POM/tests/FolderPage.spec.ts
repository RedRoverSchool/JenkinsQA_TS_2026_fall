import { test, expect, App, ItemCreationFixtures, ItemType } from "@/POM/fixtures/itemCreationFixtures";
import { folderPageData } from "../testData/folderPageData";

test.describe("US_01.002 | Folder", () => {
	test("TC_01.002.02 | Verify folder creation with Display Name", 
		async ({ app, createNewItem }
			: { app: App; } & ItemCreationFixtures) => {
		
		const configurePage = await createNewItem(ItemType.Folder, ItemType.Folder);

		await app.configureFolderPage.fillDisplayNameField(folderPageData.displayName);
		await app.configureFolderPage.clickSaveButton();

		await app.folderPage.verifyUrl(new RegExp(`/job/${ItemType.Folder}/?$`));
		await expect(app.folderPage.headingByName(folderPageData.displayName)).toBeVisible();
	});
	
	test("TC_01.002.04 | Verify creating folder", 
		async ({ app, createNewItem }
			: { app: App; } & ItemCreationFixtures) => {
		
		await createNewItem(folderPageData.folderName, ItemType.Folder);
		await app.configureFolderPage.clickSaveButton();

		await app.folderPage.verifyUrl(new RegExp(`/job/${folderPageData.folderName}/?$`));
	});
	
});
