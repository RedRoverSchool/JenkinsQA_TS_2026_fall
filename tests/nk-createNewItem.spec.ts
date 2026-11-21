import { test, expect, Page, ItemCreationFixtures, ItemType } from "./fixtures/nk-itemCreationFixtures";
import { NavigationFixtures } from "./fixtures/nk-navigationFixtures";
import { jenkinsData } from "./testData/nk-data";
import { cleanData } from "@/helpers/cleanData";


const uniqueItemName = jenkinsData.itemName;
const folder = jenkinsData.folderName; 
const itemsLocator = "#projectstatus .jenkins-table__link";


jenkinsData.itemTypes.forEach((itemType: ItemType) => {
        
    test.describe(`US_01.001 | Create new ${itemType} item with unique ItemName name`, () => {

        test.describe.configure({ mode: "serial" });
        test.use({ isSerial: true });

        test(`TC_11.001.01 | Verify there are no ${itemType} items by default at the start page`, async ({ page, createNewItem }
                : { page: Page } & ItemCreationFixtures
            ) => {
            await expect(page.locator(itemsLocator)).toHaveCount(0);
        });

        
        test(`TC_01.001.03 | Verify ${itemType} item creation`, async ({ page, createNewItem, naviateToHomePage }
                : { page: Page } & ItemCreationFixtures & NavigationFixtures
            ) => {
            await createNewItem(uniqueItemName, itemType);
            await naviateToHomePage();
            await expect(page.locator(itemsLocator)).toHaveCount(1);
            await expect(page.locator(itemsLocator)).toHaveText(uniqueItemName);
        });

       
        
        test("TC_16.001.01 | Verify few Projects' names are visible on the Dashboard",
             async ({ page, createNewItem, naviateToHomePage }
                : { page: Page } & ItemCreationFixtures & NavigationFixtures
            ) => {
            await createNewItem(folder, ItemType.Folder);
            await naviateToHomePage();
            await expect(page.locator(itemsLocator)).toHaveCount(2);
        });

        test("TC_24.002.01 | Verify there are no items by default in the new created folder",
             async ({ page, navigateToItem }
                : { page: Page } & ItemCreationFixtures & NavigationFixtures
            ) => {
            await navigateToItem(folder);
            await expect(page.locator(itemsLocator)).toHaveCount(0);
        });
        
        test(`TC_01.001.04 | Verify unique named ${itemType} item creation inside folder`, 
            async ({ page, createNewItem, navigateToParentFolder }
            : { page: Page } & ItemCreationFixtures & NavigationFixtures
        ) => {
            await createNewItem(uniqueItemName, itemType);
            await navigateToParentFolder();

            await expect(page.locator(itemsLocator)).toHaveCount(1);
            await expect(page.locator(itemsLocator)).toHaveText(uniqueItemName);

        });
        
    });
});


test.describe("US_01.001 | Create new item", () => {
    const unsafeCharacters = ['/', '!', '%', '$', '&', ';', ':', '@'];
    for (const symbol of unsafeCharacters) {
        test(`TC_01.001.17 | Verify validation message for unsafe character "${symbol}"`, async ({ page }) => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.locator('input#name').fill(symbol);
            const error = page.locator('.error');

            await expect(error).toContainText('is an unsafe character');
        });
    };
});
        
