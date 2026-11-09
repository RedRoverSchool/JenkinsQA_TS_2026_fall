import { expect } from "@playwright/test";
import { test } from "@/base";

test.describe("Test Suite", () => {
    test("Test1", async ({ page }) => {
        await expect(page).toHaveURL(/localhost:/);
    });
});
