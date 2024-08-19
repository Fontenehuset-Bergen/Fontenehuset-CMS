export default {
  name: 'events',
  type: 'document',
  title: 'Timeplan',
  fields: [
    {
      title: 'Hendelser',
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Frokost', value: 'breakfast' },
          { title: 'Lunch', value: 'lunch' },
          { title: 'Middag', value: 'dinner' },
          { title: 'Møte', value: 'meeting' },
          { title: 'Tur', value: 'hike' },
          { title: 'Fritids aktivitet', value: 'activity' }
        ]
      }
    },{
      title: 'Dato',
      name: 'date',
      type: 'datetime'
    },{
      title: 'Søk etter...',
      name: 'ref',
      type: 'object',
      fields: [
        {
          title: 'Lunsj-rett',
          name: 'lunch',
          type: 'reference',
          to: [{ type: 'menuLunch' }],
          hidden: ({ document }) => document?.name !== 'lunch'
        },{
          title: 'Tur',
          name: 'hike',
          type: 'reference',
          to: [{ type: 'hikeRoute' }],
          hidden: ({ document }) => document?.name !== 'hike'
        }
      ]
    }
  ]
}
