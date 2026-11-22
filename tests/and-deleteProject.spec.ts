import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/and-data";

test.describe("US_16.008 | Delete project", () => {
    test("TC_16.008.01 | Verify project can be deleted", async ({ page }) => {
        await page.locator(".task-link-wrapper").filter({ hasText: "New Item" }).click();
        await page.locator("#name").fill(jenkinsData.freesProjectName);
        await page.locator(".jenkins-choice-list__item__label").getByText('Freestyle project', { exact: true }).click();
        await page.getByRole("button", {name: "OK"}).click();
        await page.locator(".app-jenkins-logo").click();

        const itemLinkLocator = page.locator(`#job_${jenkinsData.freesProjectName} .jenkins-table__link`);

        await itemLinkLocator.hover();
        await itemLinkLocator.locator("button").click();
        
        const popupLocator = page.locator("div[id^='tippy-'] .jenkins-dropdown");
    
        await popupLocator.getByText(jenkinsData.jobPopupOptions.deleteProject).click();
        await page.locator("button[data-id='ok']").click();
        await expect(page.getByRole('heading', { level: 1, name: 'Welcome to Jenkins!' })).toBeVisible();
    });
})