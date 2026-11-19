import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/bs-data";

test.describe("US_01.001 | Create a new item", () => {
  test("TC_01.001.23 | Verify item creation", async ({ page }) => {
    await page.locator("span.task-link-text").filter({ hasText: "New Item" }).click();
    await page.locator("#name").fill(jenkinsData.itemName);
    await page.locator(".jenkins-choice-list__item__label").filter({ hasText: "Freestyle project" }).click();
    await page.getByRole("button", { name: "Ok" }).click();

    await page.locator(".app-jenkins-logo").click();
    const itemsLocator = page.locator("#projectstatus .jenkins-table__link");
    const itemNameArr = await itemsLocator.allInnerTexts();

    expect(itemNameArr).toContain(jenkinsData.itemName);
  });
});
