import { test, expect, Page } from "@/base";
import { invalidChars, jenkinsData } from "./testData/yr-data";
import { Locator } from "@playwright/test";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.07 | Verify item creation", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$=newJob]").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
        await page.locator("#ok-button").click();
        await page.locator("a.app-jenkins-logo").click();

        const itemLinks: Locator = page.locator("#projectstatus .jenkins-table__link");
        const itemNameArr: string[] = await itemLinks.allInnerTexts();

        expect(itemNameArr).toContain(jenkinsData.itemName);
    });

    test("TC_01.001.12 | Verify validation message when item name contains unsupported special characters", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$=newJob]").click();

        const errorMessage: Locator = page.locator(".jenkins-form-item .error");

        for (const char of invalidChars) {
            await page.locator("#name").fill(char);

            await expect.soft(errorMessage).toHaveText(`‘${char}’ is an unsafe character`);
        }
    });
});