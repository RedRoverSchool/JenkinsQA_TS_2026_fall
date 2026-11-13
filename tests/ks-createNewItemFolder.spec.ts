import { test, expect, Page } from "@/base";
import { usedData } from "./testData/ks-data";


test.describe("US_01.002 | Create New Item Folder", () => {
    test("TC_01.002.01 | Create nested folder", async ({ page }: { page: Page}) => {
        await page.locator('a[href="newJob"]').click();
        await page.locator('.jenkins-input#name').fill(usedData.itemNameOne);
        await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
        await page.locator("#ok-button").click();

        await page.locator('.jenkins-breadcrumbs__list-item a').click();
        await page.locator('a[href="newJob"]').click();
        await page.locator('.jenkins-input#name').fill(usedData.itemNameTwo);
        await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
        await page.locator("#ok-button").click();
        await page.locator('.jenkins-breadcrumbs__list-item:nth-child(2)').click();

        const nestedFullFolderName = page.locator('#main-panel').getByText('Full folder name:');

        await expect(nestedFullFolderName).toContainText(`${usedData.itemNameOne}/${usedData.itemNameTwo}`);

    });
});