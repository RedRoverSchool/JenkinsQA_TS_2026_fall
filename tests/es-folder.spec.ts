import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/es-data";

test.describe("US_01.002 | Folder", () => {
    test("01.002.04 | Verify creating folder", async ({ page }: { page: Page}) => {
        await page.locator(".task-link-wrapper").filter({ hasText: "New Item" }).click();
        await page.locator("#name").fill(jenkinsData.folderName);
        await page.locator(".jenkins-choice-list__item__label").getByText('Folder', { exact: true }).click();

        await page.getByRole("button", {name: "OK"}).click();
        await page.getByRole("button", {name: "Save"}).click();

        const folderLocator = page.getByRole("heading", { name: jenkinsData.folderName, level: 1 });
        const actualFolderName = await folderLocator.textContent();

        expect(actualFolderName).toBe(jenkinsData.folderName)

    });
}); 
