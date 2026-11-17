import { test, expect, Page, ItemCreationFixtures, ItemType } from "./fixtures/nk-itemCreationFixtures";
import { NavigationFixtures } from "./fixtures/nk-navigationFixtures";
import { jenkinsData } from "./testData/nk-data";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.03 | Verify item creation", async ({ page }
        : {page: Page}
    ) => {

        const itemsLocator = page.locator("#projectstatus .jenkins-table__link");
        const countBeforeItems = await itemsLocator.count();
        const itemName = jenkinsData.itemName;

        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(itemName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.press("#createItem","Enter");

        await page.locator(".app-jenkins-logo").click();

        await expect(itemsLocator).toHaveCount(countBeforeItems + 1);
    });


    let itemType: keyof typeof ItemType;
    for (itemType in ItemType) {
        test(`TC_01.001.04 | Verify unique named ${ItemType[itemType]} item creation inside folder`, async ({ page, createNewItem, selectItemType, navigateToItem, naviateToHomePage }
            : {page: Page} & ItemCreationFixtures & NavigationFixtures
        ) => {

            const uniqueItemName = jenkinsData.itemName;
            const folder = jenkinsData.folderName;
            
            await createNewItem(uniqueItemName, itemType);
            await createNewItem(folder, ItemType.Folder);
            await navigateToItem(folder);

            await page.locator("#side-panel a[href$=newJob]").click();
            await page.locator("#name").fill(uniqueItemName);
            await selectItemType(itemType);
            await page.press("#createItem","Enter");

            await naviateToHomePage();
            await navigateToItem(folder);

            const itemsLocatorInsideFolder = page.locator("#projectstatus .jenkins-table__link");
        
            await expect(itemsLocatorInsideFolder).toHaveText(uniqueItemName);

        });
    }

    const unsafeCharacters = ['/', '!', '%', '$', '&', ';', ':', '@'];
    for (const symbol of unsafeCharacters) {
        test(`TC_01.001.17 | Verify validation message for unsafe character "${symbol}"`, async ({ page }) => {
            await page.getByRole('link', { name: 'New Item' }).click();
            await page.locator('input#name').clear();
            await page.locator('input#name').fill(symbol);
            const error = page.locator('.error');

            await expect(error).toContainText('is an unsafe character');
        });
    }
});