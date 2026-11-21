import { ItemType } from "../fixtures/nk-itemCreationFixtures";

export const jenkinsData = {
    itemName: `item-${Date.now()}`,
    folderName: `folder-${Date.now()}`,
    itemTypes: [
        ItemType.FreestyleProject, 
        ItemType.Pipeline, 
        ItemType.MultiConfigurationProject, 
        ItemType.Folder, 
        ItemType.MultibranchPipeline, 
        ItemType.OrganizationFolder
    ],
};