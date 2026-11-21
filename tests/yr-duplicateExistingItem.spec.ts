import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/yr-data";
import { Locator } from "@playwright/test";

test.describe("US_01.003 | Duplicate an existing item", () => {
    test.beforeEach("Create a source item", async ({ page }: { page: Page }) => {
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

    test("TC_01.003.05 | Verify that item is not created from non-existing source", async ({ page }: { page: Page }) => {
        await page.getByRole("link", { name: "New Item" }).click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator("#duplicate-job").click();
        await page.getByPlaceholder("Type to autocomplete").fill(jenkinsData.nonExistingItemName);
        await page.getByRole("button", { name: "OK" }).click();
        await page.locator("a.app-jenkins-logo").click();

        const itemLinks: Locator = page.locator("#projectstatus .jenkins-table__link");
        await itemLinks.first().waitFor();
        const itemNameArr: string[] = await itemLinks.allInnerTexts();

        expect(itemNameArr).not.toContain(jenkinsData.itemName);
    });
});

test.describe("US_01.003 | Duplicate an existing item (all types)", () => {
    for (const itemType of jenkinsData.itemTypeNames) {
        test(`TC_01.003.06 | Verify that duplicate can be created for ${itemType}`, async ({ page }: { page: Page }) => {
            await page.getByRole("link", { name: "New Item" }).click();
            await page.locator("#name").fill(jenkinsData.sourceItemName);
            await page.getByText(itemType, { exact: true }).click();
            await page.getByRole("button", { name: "OK" }).click();
            await page.locator("a.app-jenkins-logo").click();

            await page.getByRole("link", { name: "New Item" }).click();
            await page.locator("#name").fill(jenkinsData.itemName);
            await page.locator("#duplicate-job").click();
            await page.getByPlaceholder("Type to autocomplete").fill(jenkinsData.sourceItemName);
            await page.locator(".jenkins-dropdown__item").filter({ hasText: jenkinsData.sourceItemName }).click();
            await page.getByRole("button", { name: "OK" }).click();
            await page.locator("a.app-jenkins-logo").click();

            const itemLinks: Locator = page.locator("#projectstatus .jenkins-table__link");
            await itemLinks.first().waitFor();
            const itemNameArr: string[] = await itemLinks.allInnerTexts();
            
            expect(itemNameArr).toContain(jenkinsData.itemName);
        });
    }
});
