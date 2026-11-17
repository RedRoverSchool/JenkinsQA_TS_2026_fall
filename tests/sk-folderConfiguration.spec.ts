import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/sk-data";

test.describe("US_05.003 | Folder Configuration > Pipeline Libraries ",()=>{

    test.beforeEach("Create Folder", async ({page}: { page: Page}) => {

        await page.getByRole("link", { name: "New Item" }).click();
        await page.locator("input#name").fill(jenkinsData.itemName);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder.jenkins-choice-list__item").click();
        await page.locator("#ok-button").click(); 
        
});

    test("TC_05.003.01 | Verify adding a new Pipeline Library", async ({page}: { page: Page}) => {
        await page.getByRole("button", { name: "Add" }).click();
        await page.locator(".setting-main [checkdependson='name']").fill(jenkinsData.nameLibrary);
        await page.locator("[checkdependson='defaultVersion implicit allowVersionOverride name']").fill(jenkinsData.defaultVersion);
        await page.getByRole("button", { name: "Save" }).click();
        await expect(page.locator(".jenkins-build-caption")).toContainText(jenkinsData.itemName);
    });

    test("TC_05.003.02 | Verify removing a Pipeline Library", async ({page}: { page: Page}) => {
        await page.getByRole("button", { name: "Add" }).click();
        await page.locator(".setting-main [checkdependson='name']").fill(jenkinsData.nameLibrary);
        await page.locator("[checkdependson='defaultVersion implicit allowVersionOverride name']").fill(jenkinsData.defaultVersion);
        await page.getByRole("button", { name: "Save" }).click();

        await page.getByRole("link", { name: "Configure" }).click();
        
        await page.getByRole('button', { name: 'Delete' }).first().click(); 
        await expect(page.locator("input[name='_.name']")).not.toBeVisible();
        
    });
});

