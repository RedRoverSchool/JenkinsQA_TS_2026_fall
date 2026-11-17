import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/as-data";

test.describe("US_01.002 | Folder", () => {
    test('TC_01.002.03 | New Item > Folder > Verify folder creation with Display Name', async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("input#name").fill(jenkinsData.folderName);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();
        await page.locator("#ok-button").click();
        await page.locator("input.jenkins-input.validated").fill(jenkinsData.displayName);
        await page.getByRole('button', { name: 'Save' }).click();

        await expect(page).toHaveURL(new RegExp(`/job/${jenkinsData.folderName}/?$`));
        await expect(
            page.getByRole('heading', { name: jenkinsData.displayName })
        ).toBeVisible();
     });
})
