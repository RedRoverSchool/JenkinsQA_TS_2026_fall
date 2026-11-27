import { faker } from "@faker-js/faker";

export enum ItemType {
	FreestyleProject = "Freestyle project",
	Pipeline = "Pipeline",
	MultiConfigurationProject = "Multi-configuration project",
	Folder = "Folder",
	MultibranchPipeline = "Multibranch Pipeline",
	OrganizationFolder = "Organization Folder"
}

export const newItemPageData = {
	itemName: faker.word.noun(),
	folderName: faker.lorem.word(),
	timestampItemName: () => {return `item-${Date.now()}`},
	itemTypes: [
		ItemType.FreestyleProject, 
		ItemType.Pipeline, 
		ItemType.MultiConfigurationProject, 
		ItemType.Folder, 
		ItemType.MultibranchPipeline, 
		ItemType.OrganizationFolder
	],
	dashboardItemsNames: new Map([		
		[ItemType.FreestyleProject, faker.word.noun()], 
		[ItemType.Pipeline, faker.word.noun()],
		[ItemType.MultiConfigurationProject, faker.word.noun()],
		[ItemType.Folder, faker.word.noun()],
		[ItemType.MultibranchPipeline, faker.word.noun()], 
		[ItemType.OrganizationFolder,  faker.word.noun()]
	]),
	unsafeCharacters : ['/', '!', '%', '$', '&', ';', ':', '@'],
};
