import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Fontenehuset-CMS',

  projectId: 'xes78pqm',
  dataset: 'production',

  plugins: [visionTool()],

  schema: {
    types: schemaTypes,
  },
})
