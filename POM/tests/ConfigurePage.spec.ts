import { test, expect, App, ItemCreationFixtures } from "@/POM/fixtures/itemCreationFixtures";
import { NavigationFixtures } from "@/POM/fixtures/navigationFixtures";
import { newItemPageData } from "../testData/newItemPageData";
import { configurePageData } from "../testData/configurePageData";


test.describe("US_01.003 | Duplicate an existing item", () => {
    for (const itemType of newItemPageData.itemTypes) {
        test(`TC_01.003.04 | Verify that description is copied from the source ${itemType}`, async ({ app, createNewItem, navigateToHomePageFrom }: 
            { app: App } & ItemCreationFixtures & NavigationFixtures) => {

            const configurePage = await createNewItem(newItemPageData.sourceItemName, itemType);

            await configurePage.fillDescriptionField(configurePageData.description);
            await configurePage.clickSaveButton();
            await navigateToHomePageFrom(configurePage);

            await app.homePage.clickNewItemLink();
            await app.newItemPage.fillItemNameField(newItemPageData.copyItemName);
            await app.newItemPage.clickDuplicateItemOption();
            await app.newItemPage.fillDuplicateItemField(newItemPageData.sourceItemName);
            await app.newItemPage.clickDuplicateItemDropdownOption(newItemPageData.sourceItemName);
            await app.newItemPage.clickOkButton();

            await expect(configurePage.descriptionField()).toHaveValue(configurePageData.description);
        });
    }
});
