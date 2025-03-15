import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {RobotIcon, RocketIcon} from '@sanity/icons'
import {schemaTypes} from './schemas'

export default defineConfig([
  {
    projectId: 'xes78pqm',
    dataset: 'production',
    name: 'production-workspace',
    basePath: '/production',
    title: 'Fontenehuset live',
    subtitle: 'production dataset',
    icon: RobotIcon,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
  {
    projectId: 'xes78pqm',
    dataset: 'development',
    name: 'development-workspace',
    basePath: '/development',
    title: 'Fontenehuset Sandbox',
    subtitle: 'development dataset',
    icon: RocketIcon,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])
