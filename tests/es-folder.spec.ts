import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/es-data";

test.describe("US_01.002 | Folder", () => {
    test("TC_01.002.04 | Verify creating folder", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.folderName);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();

        await page.locator("#ok-button").click();
        await page.locator(".jenkins-submit-button").click();

        const folderLocator = page.locator(".jenkins-app-bar .job-index-headline");

        await expect(folderLocator).toHaveText(jenkinsData.folderName)
    });

    test("TC_01.002.13 | Verify creating folder with Display name", async ({ page }: { page: Page }) => {
        await page.locator(".task-link-wrapper").filter({ hasText: "New Item" }).click();
        await page.locator("#name").fill(jenkinsData.folderName);
        await page.locator(".jenkins-choice-list__item__label").getByText("Folder", { exact: true }).click();

        await page.getByRole("button", {name: "OK"}).click();
        await page.locator("input[name ='_.displayNameOrNull']").fill(jenkinsData.displayName);
        await page.getByRole("button", {name: "Save"}).click();

        const displayLocator = page.locator(".jenkins-app-bar .job-index-headline");

        await expect(displayLocator).toHaveText(jenkinsData.displayName)
    });
}); 
