import { test, expect } from "@/base";
import { jenkinsData } from "./testData/ms-data";

test.describe("US_02.001 | Enable or Disable Project", () => {
  test("TC_02.001.03 | Verify dropdown configure option", async ({ page }) => {
    await page.locator("span.task-link-text").filter({ hasText: "New Item" }).click();
    await page.locator("#name").fill(jenkinsData.itemName);
    await page.getByText("Freestyle project", { exact: true }).click();
    await page.getByRole("button", { name: "Ok" }).click();

    await page.locator(".app-jenkins-logo").click();
    const itemLocator = page.locator("#projectstatus  .jenkins-table__link").filter({ hasText: jenkinsData.itemName });

    await itemLocator.hover();
    //verify that the browser considers the element hovered
    await expect.poll(() => itemLocator.evaluate((el) => el.matches(":hover"))).toBe(true);

    await itemLocator.locator("button").click();

    const dropdown = page.locator(".jenkins-dropdown:visible");
    await expect(dropdown).toHaveCount(1);

    const dropdownOptions = await dropdown.locator("a, button").allInnerTexts();

    await expect(dropdownOptions.map((text) => text.trim()).sort()).toEqual(
      [...Object.values(jenkinsData.jobPopUpOptions)].sort(),
    );
  });
});
