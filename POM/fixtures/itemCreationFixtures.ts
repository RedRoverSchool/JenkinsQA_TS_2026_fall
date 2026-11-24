import { test as base, NavigationFixtures, App } from "./navigationFixtures"
import { ConfigurePage } from "@/POM/pageObjects/pages/ConfigurePage/ConfigurePage";


export enum ItemType {
    FreestyleProject = "Freestyle project",
    Pipeline = "Pipeline",
    MultiConfigurationProject = "Multi-configuration project",
    Folder = "Folder",
    MultibranchPipeline = "Multibranch Pipeline",
    OrganizationFolder = "Organization Folder"
}

export interface ItemCreationFixtures {

    createNewItem: (itemName: string, itemType: ItemType) => Promise<ConfigurePage>;

};

export const test = base.extend<ItemCreationFixtures>({

    createNewItem: async ({ app }: { app: App } & NavigationFixtures & ItemCreationFixtures, use) => {

        const createWithName: ItemCreationFixtures["createNewItem"] = async (itemName: string, itemType: ItemType) => {
            await app.homePage.clickNewItemLink();
            await app.newItemPage.fillItemNameField(itemName);
            await app.newItemPage.clickItemType(itemType);
            await app.newItemPage.clickOkButton(); 
            switch (itemType) {
                case ItemType.FreestyleProject:
                    return app.configureFreestylePage;
                case ItemType.Pipeline:
                    return app.configurePipelinePage;
                case ItemType.MultiConfigurationProject:
                    return app.configureMultiConfigurationPage; 
                case ItemType.Folder:
                    return app.configureFolderPage;
                case ItemType.MultibranchPipeline:
                    return app.configureMultibranchPipelinePage;
                case ItemType.OrganizationFolder:
                    return app.configureOrganizationFolderPage;
                default:
                    throw new Error(`Unhandled item type: ${itemType}`);
            }
        };

        await use(createWithName);
    },

});

export const expect = base.expect;
export type { App };
