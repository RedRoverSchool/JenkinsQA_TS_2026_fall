import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ad-data";

const jobName = jenkinsData.itemName;
test.beforeEach("Create one Jenkins item", async ({ page }: { page: Page }) => {
    //pre-condition
    await page.locator("#side-panel a[href$='newJob']").click();
    await page.locator("#name").fill(jobName);
    await page.locator(".hudson_model_FreeStyleProject").click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator(".app-jenkins-logo").click();
});

test.describe("US_01.003 | Duplicate an existing item", () => {
    test('TC_01.003.01 | Verify that "No items" dropdown is displayed when no items match in "Duplicate an existing item" field.', async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#duplicate-job").click();

        const copyFrom = page.locator("#from");
        await copyFrom.pressSequentially(jobName.length + jobName);

        const noItemsDropdown = page.locator('.jenkins-dropdown__placeholder');
        await expect(noItemsDropdown).toHaveText(jenkinsData.textNoItemsDropdown);
    });
});

test.describe("US_01.003 | Duplicate an existing item", () => {
    test('TC_01.003.02 | Verify that "Duplicate an existing item" field displays matching items in the dropdown list', async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#duplicate-job").click();

        const copyFrom = page.locator("#from");
        await copyFrom.pressSequentially(jobName);

        for (let i = 0; i < jobName.length - 1; i++) {
            await copyFrom.press("Backspace");
        }

        const itemsDropdown = page.locator('.jenkins-dropdown__item');
        await expect(itemsDropdown).toHaveText(jobName);
    });
});