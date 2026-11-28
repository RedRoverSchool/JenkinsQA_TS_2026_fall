import { ItemType, newItemPageData } from "../testData/newItemPageData";
import { test, expect, App, ItemCreationFixtures,  } from "@/POM/fixtures/itemCreationFixtures";



test.describe("US_01.001 | Create new item", () => {
	for (const symbol of newItemPageData.unsafeCharacters) {
		test(`TC_01.001.17 | Verify validation message for unsafe character "${symbol}"`, 
			async ({ app, createNewItem }
					: { app: App } & ItemCreationFixtures
			) => {
			await createNewItem(ItemType.FreestyleProject,symbol, true);
			await expect(app.newItemPage.validationMessage()).toContainText('is an unsafe character');
		});
	};
});

