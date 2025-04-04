import { DashboardIcon } from "@sanity/icons"
import { TrelloImportPage } from "./page";

export const trelloImportTool = () => {
  return {
    title: "Trello",
    name: "trello",
    icon: DashboardIcon,
    component: () => TrelloImportPage(),
  };
};
