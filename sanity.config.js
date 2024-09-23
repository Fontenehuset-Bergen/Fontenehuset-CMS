import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {TrelloImportTool} from './components/TrelloImport'

export default defineConfig({
  name: 'default',
  title: 'Fontenehuset-CMS',
  projectId: 'xes78pqm',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  tools: [TrelloImportTool()],
  schema: {
    types: schemaTypes,
  },
})
