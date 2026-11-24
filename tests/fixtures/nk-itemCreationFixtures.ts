import { test as base, NavigationFixtures, Page } from "./nk-navigationFixtures"

export enum ItemType {
    FreestyleProject = "Freestyle project",
    Pipeline = "Pipeline",
    MultiConfigurationProject = "Multi-configuration project",
    Folder = "Folder",
    MultibranchPipeline = "Multibranch Pipeline",
    OrganizationFolder = "Organization Folder"
}

export interface ItemCreationFixtures {

    selectItemType: (itemType: ItemType) => Promise<void>;
    createNewItem: (itemName: string, itemType: ItemType) => Promise<void>;
    saveConfiguration: () => Promise<void>;

};

export const test = base.extend<ItemCreationFixtures>({
    selectItemType: async ({ page }: { page: Page }, use) => {

        const selectWithType: ItemCreationFixtures["selectItemType"] = async (itemType: ItemType) => {
            await page.getByText(itemType, { exact: true }).click();
        };

        await use(selectWithType);
    },

    createNewItem: async ({ page, naviateToHomePage, selectItemType }: { page: Page } & NavigationFixtures & ItemCreationFixtures, use) => {

        const createWithName: ItemCreationFixtures["createNewItem"] = async (itemName: string, itemType: ItemType) => {
            await page.locator("#side-panel a[href$=newJob]").click();
            await page.locator("#name").fill(itemName);
            await selectItemType(itemType);
            await page.press("#createItem", "Enter");

        };

        await use(createWithName);
    },

        saveConfiguration: async ({ page, naviateToHomePage, selectItemType }: { page: Page } & NavigationFixtures & ItemCreationFixtures, use) => {

        const saveConfigrationByButton: ItemCreationFixtures["saveConfiguration"] = async () => {

            await page.getByRole("button", { name: "Save" }).click();
        };

        await use(saveConfigrationByButton);
    },

});

export const expect = base.expect;
export type { Page };
