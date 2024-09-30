import {defineConfig} from 'sanity'
import {structureTool } from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {TrelloImportTool} from './components/TrelloImport'

export default defineConfig({
  name: 'default',
  title: 'Fontenehuset-CMS',
  projectId: 'xes78pqm',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  tools: [TrelloImportTool({apikey: process.env.SANITY_STUDIO_TRELLO_API_KEY})],
  schema: {
    types: schemaTypes,
  },
})
