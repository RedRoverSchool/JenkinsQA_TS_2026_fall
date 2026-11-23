import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ed-data";

test.describe("US_10.003 | Manage Jenkins > System", () => {
    test("TC_10.003.01 | Edit System Message", async ({ page }: { page: Page}) => {
        await page.locator("#root-action-ManageJenkinsAction").click();
        await page.locator("a[href='configure']").click();

        await page.locator("textarea[name='system_message']").fill(jenkinsData.systemMessage);
        await page.getByRole("button", {name: "Save"}).click();

        await expect(page.locator("#systemmessage")).toHaveText(jenkinsData.systemMessage);
    });
});