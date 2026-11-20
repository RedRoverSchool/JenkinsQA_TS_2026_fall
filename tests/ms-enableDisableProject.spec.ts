import { test, expect } from "@/base";
import { jenkinsData } from "./testData/ms-data";

test.describe("US_02.001 | Enable or Disable Project", () => {
  test("TC_02.001.03 | Verify dropdown configure option", async ({ page }) => {
    await page.locator("span.task-link-text").filter({ hasText: "New Item" }).click();
    await page.locator("#name").fill(jenkinsData.itemName);
    await page.locator(".jenkins-choice-list__item__label").filter({ hasText: "Freestyle project" }).click();
    await page.getByRole("button", { name: "Ok" }).click();

    await page.locator(".app-jenkins-logo").click();
    const itemLocator = page.locator(`#job_${jenkinsData.itemName} .jenkins-table__link`);
    await itemLocator.hover();
    //verify that the browser considers the element hovered
    await expect.poll(() => itemLocator.evaluate((el) => el.matches(":hover"))).toBe(true);

    await itemLocator.locator("button").click();

    const popUopLocator = page.locator("#tippy-4 .jenkins-dropdown");
    const popUpInnerTexts = await popUopLocator.locator("a,  button").allInnerTexts();
    expect(popUpInnerTexts).toContain(jenkinsData.jobPopUpOptions);
  });
});
