import { faker } from "@faker-js/faker";

export const jenkinsData = {
    itemName: faker.hacker.noun(),
    jobPopupOptions: {
        changes: "Changes",
        workspace: "Workspace",
        buildNow: "Build Now",
        deleteProject: "Delete Project",
        configure: "Configure",
        rename: "Rename"
    }
};
