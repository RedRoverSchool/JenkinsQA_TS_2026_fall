import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/yr-data";


test.describe("US_01.002 | Folder", () => {
    test("TC_01.002.07 | Verify redirect to the folder overview page after folder creation", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$=newJob]").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder").click();
        await page.locator("#ok-button").click();
        await page.getByRole("button", { name: "Save" }).click();

        await expect(page).toHaveURL(`/job/${jenkinsData.itemName}/`);
    });
});
