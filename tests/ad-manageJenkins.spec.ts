import { test, expect, Page } from "@/base";

test.describe("US_10.001 | Manage Jenkins", () => {
    test("TC_10.001.01 | Verify visibility of Manage Jenkins option", async ({ page }) => {

        const manageJenkinsIcon = page.locator("#root-action-ManageJenkinsAction");
        await manageJenkinsIcon.hover();

        await expect(page.locator("#root-action-ManageJenkinsAction:hover")).toBeVisible();
    });

     test("TC_10.001.02 | Verify redirect to Management page", async ({ page }) => {

        await page.locator("#root-action-ManageJenkinsAction").click();

        await expect(page.getByRole("heading", { name: "System Configuration" })).toBeVisible();
    });
});