import { test, expect, Page } from "@/base";

test.describe("testing conflicts suite", () => {
    test("testing conflicts", async ({ page }: { page: Page }) => {
        expect(page.locator("h1")).toHaveText("Welcome to Jenkins!");
    });

    test("testing conflicts another", async ({ page }: { page: Page }) => {
        expect(page.locator("h1")).toHaveText("Welcome to Jenkins!");
    });
}); 
