import { test, expect, App } from "@/POM/fixtures/baseFixture";
import { Page } from "@/base";
import { folderPageData } from "../testData/folderPageData";

test.describe("US_01.002 | Folder", () => {
	test("TC_01.002.02 | Verify folder creation with Display Name", async ({ app, page }: { app: App; page: Page }) => {
		await app.homePage.clickNewItemLink();

		await app.newItemPage.fillItemNameField(folderPageData.folderName);
		await app.newItemPage.clickFolderType();
		await app.newItemPage.clickOkButton();

		await app.configureFolderPage.fillDisplayNameField(folderPageData.displayName);
		await app.configureFolderPage.clickSaveButton();

		await expect(page).toHaveURL(new RegExp(`/job/${folderPageData.folderName}/?$`));
		await expect(app.folderPage.headingByName(folderPageData.displayName)).toBeVisible();
	});
});
