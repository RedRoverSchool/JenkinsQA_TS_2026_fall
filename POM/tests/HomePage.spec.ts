import { newItemPageData } from "../testData/newItemPageData";
import { NavigationFixtures } from "@/POM/fixtures/navigationFixtures";
import { test, expect, App, ItemCreationFixtures, ItemType } from "@/POM/fixtures/itemCreationFixtures";
import { ConfigurePage } from "@/POM/pageObjects/pages/ConfigurePage/ConfigurePage";

const uniqueItemName = newItemPageData.itemName
newItemPageData.itemTypes.forEach((itemType: ItemType) => {
	test.describe(`US_01.001 | Create new ${itemType} item `, () => {
		test(`TC_01.001.01 | Verify  ${itemType} item creation`, 
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

	test.describe(`US_20.001 | Open ${itemType} from Dashboard`, () => {
	
		test(`TC_POM_20.001.01 | Verify few ${itemType} names are visible on the Dashboard`, 
			async ({ app, createNewItem, navigateToHomePageFrom }
				: { app: App } & ItemCreationFixtures & NavigationFixtures
			) => {
			
			for(const [itemType, itemName] of newItemPageData.dashboardItems) {
				const configurePage = await createNewItem(itemName, itemType);
				await navigateToHomePageFrom(configurePage);
			}

			const configurePage = await createNewItem(uniqueItemName, itemType);
			await navigateToHomePageFrom(configurePage);

			await expect(app.homePage.itemLinkWithName(uniqueItemName)).toHaveCount(1);
			await expect(app.homePage.itemLinkWithName(uniqueItemName)).toHaveText(newItemPageData.itemName);
		});
	});
});

test.describe("US_01.002 | Folder", () => {
	test("TC_01.002.12 | Verify deleting a folder", async ({ app, createNewItem } 
			: { app: App } &  ItemCreationFixtures) => {
		
	    await createNewItem(ItemType.Folder, ItemType.Folder);	
		await app.configureFolderPage.clickSaveButton();
		await app.folderPage.clickDeleteFolderButton();
		await app.folderPage.clickConfirmDeleteButton();

		await expect(app.homePage.projectStatusItemName()).not.toBeVisible();		
	});

});

