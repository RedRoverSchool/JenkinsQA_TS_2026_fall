import { test, expect, App, ItemCreationFixtures, ItemType } from "@/POM/fixtures/itemCreationFixtures";
import { Page } from "@/base";
import { folderPageData } from "../testData/folderPageData";

test.describe.only("US_01.002 | Folder", () => {
	test("TC_01.002.02 | Verify folder creation with Display Name", 
		async ({ app, createNewItem }
			: { app: App; } & ItemCreationFixtures) => {
		
		const configurePage = await createNewItem(ItemType.Folder, ItemType.Folder);

		await app.configureFolderPage.fillDisplayNameField(folderPageData.displayName);
		await app.configureFolderPage.clickSaveButton();

		await app.folderPage.verifyUrl(new RegExp(`/job/${ItemType.Folder}/?$`));
		await expect(app.folderPage.headingByName(folderPageData.displayName)).toBeVisible();
	});
});
