import { type Tool } from "sanity";
import { DashboardIcon } from "@sanity/icons";
import { ComponentType } from "react";
import { TrelloImportPage } from "./page";

export interface TrelloApiSecrets {
  trelloApiKey: string;
  trelloToken: string;
  trelloBoardId: string;
}

export interface TrelloImportTool {
  component: ComponentType<{
    tool: Tool<TrelloApiSecrets>;
  }>;
}

export const trelloImportTool = (secrets: TrelloApiSecrets) => {
  return {
    title: "Trello",
    name: "trello-import-tool", // localhost:3333/my-custom-tool
    icon: DashboardIcon,
    component: () => TrelloImportPage(secrets),
  };
};
