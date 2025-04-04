import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { RobotIcon, RocketIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemasTypes";
import { trelloImportTool } from "./tools/trello";

export default defineConfig([
  {
    projectId: "xes78pqm",
    dataset: "production",
    name: "production-workspace",
    basePath: "/production",
    title: "Fontenehuset live",
    subtitle: "production dataset",
    icon: RobotIcon,
    plugins: [structureTool(), visionTool()],
    tools: [
      trelloImportTool({
        trelloApiKey: process.env.SANITY_STUDIO_TRELLO_API_KEY as string,
        trelloToken: process.env.SANITY_STUDIO_TRELLO_TOKEN as string,
        trelloBoardId: process.env.SANITY_STUDIO_TRELLO_BOARD_ID as string,
      }),
    ],
    schema: {
      types: schemaTypes,
    },
  },
  {
    projectId: "xes78pqm",
    dataset: "development",
    name: "development-workspace",
    basePath: "/development",
    title: "Fontenehuset Sandbox",
    subtitle: "development dataset",
    icon: RocketIcon,
    plugins: [structureTool(), visionTool()],
    tools: [
      trelloImportTool({
        trelloApiKey: process.env.SANITY_STUDIO_TRELLO_API_KEY as string,
        trelloToken: process.env.SANITY_STUDIO_TRELLO_TOKEN as string,
        trelloBoardId: process.env.SANITY_STUDIO_TRELLO_BOARD_ID as string,
      }),
    ],
    schema: {
      types: schemaTypes,
    },
  },
]);
