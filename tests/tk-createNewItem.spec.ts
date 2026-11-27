import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/tk-data";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.28 | Verify new item creation", async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        const itemsLocator = page.locator("#projectstatus .jenkins-table__link");
        const itemNameArr = await itemsLocator.allInnerTexts();

        expect(itemNameArr).toContain(jenkinsData.itemName);
    });
});