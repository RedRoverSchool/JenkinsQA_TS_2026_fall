import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/yr-data";
import { Locator } from "@playwright/test";

test.describe("US_01.003 | Duplicate an existing item", () => {
    test.beforeEach(async ({ page }: { page: Page }) => {
        await page.getByRole("link", { name: "New Item" }).click();
        await page.locator("#name").fill(jenkinsData.sourceItemName);
        await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
        await page.getByRole("button", { name: "OK" }).click();
        await page.locator("textarea[name='description']").fill(jenkinsData.sourceItemDescription);
        await page.getByRole("button", { name: "Save" }).click();
        await page.locator("a.app-jenkins-logo").click();
    });

    test("TC_01.003.04 | Verify that description is copied from the source item", async ({ page }: { page: Page }) => {
        await page.getByRole("link", { name: "New Item" }).click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator("#duplicate-job").click();
        await page.getByPlaceholder("Type to autocomplete").fill(jenkinsData.sourceItemName);
        await page.locator(".jenkins-dropdown__item").filter({ hasText: jenkinsData.sourceItemName }).click();
        await page.getByRole("button", { name: "OK" }).click();

        const descriptionField: Locator = page.locator("textarea[name='description']");

        await expect(descriptionField).toHaveValue(jenkinsData.sourceItemDescription);
    });
});
