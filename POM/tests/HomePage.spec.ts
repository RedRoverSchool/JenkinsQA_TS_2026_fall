import { newItemPageData } from "../testData/newItemPageData";
import { NavigationFixtures } from "@/POM/fixtures/navigationFixtures";
import { test, expect, App, ItemCreationFixtures, ItemType } from "@/POM/fixtures/itemCreationFixtures";
import { ConfigurePage } from "@/POM/pageObjects/pages/ConfigurePage/ConfigurePage";

const uniqueItemName = newItemPageData.itemName
newItemPageData.itemTypes.forEach((itemType: ItemType) => {
	test.describe(`US_01.001 | Create new  ${itemType} item `, () => {
		test("TC_01.001.01 | Verify item creation", 
			async ({ app, navigateToHomePageFrom, createNewItem }
			: { app: App } & NavigationFixtures & ItemCreationFixtures) => {

			const configurePage = await createNewItem(uniqueItemName, itemType);
			await navigateToHomePageFrom(configurePage);

			await expect(app.homePage.projectStatusItemName()).toHaveText(newItemPageData.itemName);
		});
			
		test(`TC_01.001.03 | Verify ${itemType} item creation`, async ({ app, createNewItem, navigateToHomePageFrom }
				: { app: App } & ItemCreationFixtures & NavigationFixtures
			) => {
			const configurePage = await createNewItem(uniqueItemName, itemType);
			await navigateToHomePageFrom(configurePage);
			await expect(app.homePage.projectStatusItemName()).toHaveCount(1);			
		});
	});
});
