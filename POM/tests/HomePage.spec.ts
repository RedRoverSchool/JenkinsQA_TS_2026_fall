import { newItemPageData, ItemType } from "../testData/newItemPageData";
import { NavigationFixtures } from "@/POM/fixtures/navigationFixtures";
import { test, expect, App, ItemCreationFixtures } from "@/POM/fixtures/itemCreationFixtures";


newItemPageData.itemTypes.forEach((itemType: ItemType) => {
	test.describe(`US_01.001 | Create new ${itemType} item `, () => {
		test(`TC_01.001.01 | Verify  ${itemType} item creation`, 
			async ({ app, navigateToHomePageFrom, createNewItem }
			: { app: App } & NavigationFixtures & ItemCreationFixtures) => {
			
			const validItemName = newItemPageData.itemName;
			const configurePage = await createNewItem(itemType, validItemName);
			await navigateToHomePageFrom(configurePage);

			await expect(app.homePage.projectStatusItemName()).toHaveText(validItemName);
		});
			
		test(`TC_01.001.03 | Verify ${itemType} item creation`, async ({ app, createNewItem, navigateToHomePageFrom }
				: { app: App } & ItemCreationFixtures & NavigationFixtures
			) => {
			
			const configurePage = await createNewItem(itemType);
			await navigateToHomePageFrom(configurePage);
			await expect(app.homePage.projectStatusItemName()).toHaveCount(1);			
		});

		
	});

	test.describe(`US_16.001 | Access to the ${itemType} from the Dashboard`, () => {
		test("TC_16.001.01 | Verify few Projects' names are visible on the Dashboard",
				async ({ app, createNewItem, navigateToHomePageFrom }
				: { app: App } & ItemCreationFixtures & NavigationFixtures
			) => {

			const firstItemConfigurePage = await createNewItem(itemType);
			await navigateToHomePageFrom(firstItemConfigurePage);
			const secondItemConfigurePage = await createNewItem(itemType);
			await navigateToHomePageFrom(secondItemConfigurePage);

			await expect(app.homePage.projectStatusItemName()).toHaveCount(2);
		});
	});

	test.describe(`US_20.001 | Open ${itemType} from Dashboard`, () => {
	
		test(`TC_POM_20.001.01 | Verify an item of type ${itemType} is listed among existing items on the common Dashboard`, 
			async ({ app, createNewItem, navigateToHomePageFrom }
				: { app: App } & ItemCreationFixtures & NavigationFixtures
			) => {
			
			for(const [dashboardItemType, dashboardItemName] of newItemPageData.dashboardItemsNames) {
				const configurePage = await createNewItem(dashboardItemType, dashboardItemName);
				await navigateToHomePageFrom(configurePage);
			}

			const uniqueItemName = newItemPageData.timestampItemName();
			const configurePage = await createNewItem(itemType, uniqueItemName);
			await navigateToHomePageFrom(configurePage);

			await expect(app.homePage.itemLinkWithName(uniqueItemName)).toHaveCount(1);
			await expect(app.homePage.itemLinkWithName(uniqueItemName)).toHaveText(uniqueItemName);
		});
	});
});

test.describe("US_01.002 | Folder", () => {
	test("TC_01.002.12 | Verify deleting a folder", async ({ app, createNewItem } 
			: { app: App } &  ItemCreationFixtures) => {
		
	    const configurePage = await createNewItem(ItemType.Folder, newItemPageData.dashboardItemsNames.get(ItemType.Folder));	
		configurePage.clickSaveButton();
		await app.folderPage.clickDeleteFolderButton();
		await app.folderPage.clickConfirmDeleteButton();

		await expect(app.homePage.projectStatusItemName()).not.toBeVisible();		
	});

});

