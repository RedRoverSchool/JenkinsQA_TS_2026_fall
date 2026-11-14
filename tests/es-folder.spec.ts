import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/es-data";

test.describe("US_01.002 | Folder", () => {
    test("01.002.04 | Verify creating folder", async ({ page }: { page: Page}) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.folderName);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();

        await page.locator("#ok-button").click();
        await page.locator(".jenkins-submit-button").click();

        const folderLocator = page.locator(".jenkins-app-bar .job-index-headline");
        const actualFolderName = await folderLocator.textContent();

        expect(actualFolderName).toBe(jenkinsData.folderName)

    });
}); 
