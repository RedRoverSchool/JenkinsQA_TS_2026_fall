import { test, expect, App } from "@/POM/fixtures/baseFixture";
import { newItemPageData } from "../testData/newItemPageData";

test.describe("US_01.001 | Create new item", () => {
	test("TC_01.001.01 | Verify item creation", async ({ app }: { app: App }) => {
		await app.homePage.clickNewItemLink();

		await app.newItemPage.fillItemNameField(newItemPageData.itemName);
		await app.newItemPage.clickFreestyleProjectType();
		await app.newItemPage.clickOkButton();

		await app.configureFreestylePage.header.clickLogo();

		await expect(app.homePage.projectStatusItemName()).toHaveText(newItemPageData.itemName);
	});
});
