import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/mn-data";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.18 | Verify item creation", async ({ page }) => {
        await page.locator("a[href='/view/all/newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        const jobsLocator = page.locator("#projectstatus .jenkins-table__link");
        const jobsNamesArr = await jobsLocator.allInnerTexts()

        expect(jobsNamesArr).toContain(jenkinsData.itemName);
    });
});