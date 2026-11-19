
import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/tb-data";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.24 | Verify item creation", async ({ page }) => {

await page.locator ("#side-panel a[href$='newJob']").click();
await page.locator("#name").fill(jenkinsData.itemName );
await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").click();
await page.locator("#ok-button").click();

await page.locator(".app-jenkins-logo").click();

const itemslocator = page.locator("#projectstatus .jenkins-table__link");

// await expect (itemlocator).toHaveText(jenkinsData.itemName);

const itemNameArr = await itemslocator.allInnerTexts(); 
expect(itemNameArr).toContain(jenkinsData.itemName);
    });

}); 


//<div class="org_jenkinsci_plugins_workflow_job_WorkflowJob jenkins-choice-list__item"><label><div class="jenkins-choice-list__item__icon"><svg class="icon-xlg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" height="468px" version="1.1" viewBox="0 0 468 468" width="468px">    <g fill="none" fill-rule="evenodd" stroke="none" stroke-linecap="round" stroke-width="1">        <path d="M69,414 L69,284 C69,228.771525 113.771525,184 169,184 L273,184 C287.359403,184 299,172.359403 299,158 L299,54 L299,54 M399,54 L399,184 C399,239.228475 354.228475,284 299,284 L195,284 C180.640597,284 169,295.640597 169,310 L169,414 L169,414" stroke="currentColor" stroke-width="32"></path>    </g></svg></div><input type="radio" name="mode" value="org.jenkinsci.plugins.workflow.job.WorkflowJob"><span class="jenkins-choice-list__item__label">Pipeline</span><div class="jenkins-choice-list__item__descrip