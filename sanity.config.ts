import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemasTypes";

export default defineConfig({
  name: "default",
  title: "Fontenehuset-CMS",
  projectId: "xes78pqm",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
