import { test, expect } from "@/base";
import { jenkinsData } from "./testData/sk-data";

test.describe("US_01.002 | New Item | Folder", () => {

    test("TC_01.002.12 | Verify deleting a folder", async ({page}) => {
        await page.getByRole("link", { name: "New Item" }).click();
        await page.locator("input#name").fill(jenkinsData.itemName);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder.jenkins-choice-list__item").click();
        await page.locator("#ok-button").click();
        await page.getByRole("button", {name: "Save"}).click();
        await page.getByRole("link", { name: "Delete Folder"}).click();
        await page.locator(".bottom-sticker-inner [data-id='ok']").click();
        const jobLink = page.locator("#projectstatus .jenkins-table__link", { hasText: jenkinsData.itemName });

        await expect(jobLink).not.toBeVisible();    
    });
}); 
