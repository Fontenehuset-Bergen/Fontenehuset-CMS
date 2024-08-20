export default {
  title: 'Turløyper',
  name: 'routes',
  type: 'document',
  fields: [
    {
      title: 'Turnavn',
      name: 'name',
      type: 'string',
      description: 'Navn på denne turen, dette kan gjerne være et internt kallenavn eller navn på område',
      validation: rule => rule.required().min(10).max(30)
    },{
      title: 'Turområde',
      name: 'area',
      type: 'string',
      description: 'I hvilket område foregår denne turen?',
      validation: rule => rule.required().min(10).max(30)
    },{
      title: 'Vanskelighetsgrad',
      name: 'difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Vanskelig', value: 'hard' },
          { title: 'Middels', value: 'normal' },
          { title: 'Lett', value: 'easy' }
        ],
        layout: 'radio'
      },
      validation: rule => rule.required()
    },{
      title: 'Lenge på tur i Km',
      name: 'distance',
      type: 'string',
      description: 'Omtrent hvor mange kilometer er denne turen',
    },{
      title: 'Lengde i tid',
      name: 'duration',
      type: 'number',
      description: 'Omtrent hvor mange timer tar denne turen',
    },{
      title: 'Turbeskrivelse',
      name: 'description',
      type: 'string'
    },{
      title: 'Oppmøte sted',
      name: 'meetup',
      type: 'string',
      description: 'Google maps link til oppmøte sted'
    },{
      title: 'Rute',
      name: 'route',
      type: 'string',
      description: 'Google maps link til tur rute'
    },{
      title: 'Bilder fra turen',
      name: 'gallery',
      type: 'array',
      of: [
        {
          title: 'Bilde',
          name: 'image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Bildebeskrivelse',
            },
          ],
        }
      ]
    }
  ]
}