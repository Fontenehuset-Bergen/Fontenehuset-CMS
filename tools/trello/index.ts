import { DashboardIcon } from "@sanity/icons";
import { TrelloImportWrapper } from "./wrapper";

export const trelloImportTool = () => {
  return {
    title: "Trello",
    name: "trello",
    icon: DashboardIcon,
    component: () => TrelloImportWrapper(),
  };
};
