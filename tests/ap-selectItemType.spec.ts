import { test, expect } from "@/base";
import { jenkinsData } from "./testData/ap-data";

test.describe("US_01.004 | New Item > Select an Item type", () => {
    test("TC_01.004.01 | Verify redirect to the item configuration page after clicking OK", async ({ page }) => {
        const newItemLink = page.getByRole("link", { name: "New Item" });
        const newItemHeading = page.getByRole("heading", { name: "New Item" });
        const textBox = page.getByRole("textbox");
        const pipelineItem = page.getByText("Pipeline", { exact: true });
        const okButton = page.getByRole("button", { name: "OK" });
        const saveButton = page.getByRole("button", { name: "Save" });

        await newItemLink.click();
        await expect(newItemHeading).toBeVisible();
        await textBox.fill(jenkinsData.itemName);
        await pipelineItem.click();
        await okButton.click();
        await expect(page).toHaveURL(`job/${jenkinsData.itemName}/configure`);
        await expect(saveButton).toBeVisible();
    });
});