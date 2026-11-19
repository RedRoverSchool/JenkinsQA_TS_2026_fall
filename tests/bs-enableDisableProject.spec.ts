import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/bs-data";

test.describe("US_02.001 | Enable or Disable Project", () => {
    test("TC_02.001.01 | Verify dropdown configure option", async ({ page }: { page: Page}) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        const itemLinkLocator = page.locator(`#job_${jenkinsData.itemName} .jenkins-table__link`);
        await itemLinkLocator.hover();

        await itemLinkLocator.locator("button").click();

        const popupLocator = page.locator("div[id^='tippy-'] .jenkins-dropdown");
        const popupLinks = await popupLocator.locator("a, button").allInnerTexts();

        expect(popupLinks).toContain(jenkinsData.jobPopupOptions.configure);
    });
}); 