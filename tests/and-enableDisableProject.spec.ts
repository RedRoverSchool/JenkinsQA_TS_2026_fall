import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/and-data";

test.describe("US_02.001 | Enable or Disable the Project", () => {
    test("TC_02.001.04 | Verify that project can be disabled", async ({ page }) => {
        await page.locator(".task-link-wrapper").filter({ hasText: "New Item" }).click();
        await page.locator("#name").fill(jenkinsData.freesProjectName);
        await page.locator(".jenkins-choice-list__item__label").getByText('Freestyle project', { exact: true }).click();
        await page.getByRole("button", {name: "OK"}).click();
        await page.locator(".app-jenkins-logo").click();
        // const itemLinkLocator = page.getByRole('link', { name: jenkinsData.freesProjectName });
        const itemLinkLocator = page.locator(`#job_${jenkinsData.freesProjectName} .jenkins-table__link`);
        await itemLinkLocator.hover();
        
        await itemLinkLocator.locator("button").click();
        
        const popupLocator = page.locator("div[id^='tippy-'] .jenkins-dropdown");
        const popupLinks = await popupLocator.locator("a, button").allInnerTexts();
        await popupLocator.getByText(jenkinsData.jobPopupOptions.configure).click();
        await page.getByText('DisabledEnabled').click();
        await page.getByRole("button", { name: "Save"}).click();
        expect(page.locator(".warning")).toContainText(" This project is currently disabled");
    });
})