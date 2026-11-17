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
    selectItemType: (itemType: keyof typeof ItemType) => Promise<void>;
    createNewItem: (itemName: string, itemType: keyof typeof ItemType) => Promise<void>;
    
};

export const test = base.extend<ItemCreationFixtures>({
    selectItemType: async ({ page }: {page: Page} , use) => {
        const selectWithType: ItemCreationFixtures['selectItemType'] = async (itemType: keyof typeof ItemType) => {
            await page.getByText(ItemType[itemType], { exact: true }).click();
        };

        await use(selectWithType);
    },

    createNewItem: async ({ page, naviateToHomePage, selectItemType}: {page: Page} & NavigationFixtures & ItemCreationFixtures, use) => {
        const createWithName: ItemCreationFixtures['createNewItem'] = async (itemName: string, itemType: keyof typeof ItemType) => {
            await page.locator("#side-panel a[href$=newJob]").click();
            await page.locator("#name").fill(itemName);
            await selectItemType(itemType);
            await page.press("#createItem","Enter");
            //await page.locator("#ok-button").click();
            await naviateToHomePage()
        };

        await use(createWithName);
    },

});

export const expect = base.expect;
export type { Page };
