import { Locator } from "@playwright/test";
import { test, expect, Page, ItemCreationFixtures, ItemType } from "./fixtures/nk-itemCreationFixtures";
import { NavigationFixtures } from "./fixtures/nk-navigationFixtures";
import { jenkinsData } from "./testData/nk-data";

test.describe("US_01.001 | Create new item", () => {

    jenkinsData.itemTypes.forEach((itemType: ItemType) => {
        test(`TC_01.001.03 | Verify ${itemType} item creation`, async ({ page, createNewItem }
            : { page: Page } & ItemCreationFixtures
        ) => {
            
            const itemName = jenkinsData.itemName;
            let countOfItems = 0;

            const itemsLocator = "#projectstatus .jenkins-table__link";
            await expect(page.locator(itemsLocator)).toHaveCount(countOfItems);

            await createNewItem(itemName, itemType);
            countOfItems++;

            await expect(page.locator(itemsLocator)).toHaveCount(countOfItems);
        });
    });

    jenkinsData.itemTypes.forEach((itemType: ItemType) => {
        test(`TC_01.001.04 | Verify unique named ${itemType} item creation inside folder`, async ({ page, createNewItem, selectItemType, navigateToItem, naviateToHomePage }
            : { page: Page } & ItemCreationFixtures & NavigationFixtures
        ) => {

            const uniqueItemName = jenkinsData.itemName;
            const folder = jenkinsData.folderName;
            const uniqueItemNameCount = 1;
            

            await createNewItem(uniqueItemName, itemType);
            const itemsLocator = "#projectstatus .jenkins-table__link";
            await expect.soft(page.locator(itemsLocator)).toHaveCount(uniqueItemNameCount);

            await createNewItem(folder, ItemType.Folder);
            let insideFolderItemsCount = 0;

            await navigateToItem(folder);
            await expect(page.locator(itemsLocator)).toHaveCount(insideFolderItemsCount);

            await page.locator("#side-panel a[href$=newJob]").click();
            await page.locator("#name").fill(uniqueItemName);
            await selectItemType(itemType);
            await page.press("#createItem", "Enter");
            insideFolderItemsCount++;

            await naviateToHomePage();
            await navigateToItem(folder);

            await expect(page.locator(itemsLocator)).toHaveCount(insideFolderItemsCount);
            await expect(page.locator(itemsLocator)).toHaveText(uniqueItemName);

        });
    });

    const unsafeCharacters = ['/', '!', '%', '$', '&', ';', ':', '@'];
    for (const symbol of unsafeCharacters) {
        test(`TC_01.001.17 | Verify validation message for unsafe character "${symbol}"`, async ({ page }) => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.locator('input#name').fill(symbol);
            const error = page.locator('.error');

            await expect(error).toContainText('is an unsafe character');
        });
    }
});