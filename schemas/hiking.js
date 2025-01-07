export default {
  name: 'hiking',
  type: 'document',
  title: 'Turer',
  fields: [
    {
      name: 'mainhikeImage',
      type: 'image',
      title: 'Hovedturbilde',
    },
    {
      name: 'placeName',
      type: 'string',
      title: 'Tursted',
      description:
        'Navn på denne turen, dette kan gjerne være et internt kallenavn eller navn på område',
      validation: (rule) => rule.required().min(10).max(30),
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Dato',
      validation: (rule) => rule.required(),
    },
    {
      title: 'Vanskelighetsgrad',
      name: 'difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Vanskelig', value: 'vanskelig'},
          {title: 'Middels', value: 'middels'},
          {title: 'Lett', value: 'lett'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'timeUse',
      type: 'string',
      title: 'Tidsbruk',
    },
    {
      name: 'height',
      type: 'string',
      title: 'Høyde',
    },
    {
      name: 'distance',
      type: 'string',
      title: 'Distanse',
    },
    {
      name: 'weather',
      type: 'string',
      title: 'Vær',
    },
    {
      name: 'description',
      type: 'string',
      title: 'Turbeskrivelse',
    },
    {
      name: 'access',
      type: 'string',
      title: 'Adkomst',
    },
    {
      name: 'placesStop',
      type: 'string',
      title: 'Stoppesteder',
    },
    {
      name: 'destinationImage',
      type: 'image',
      title: 'Destinasjonsbilde',
    },
    {
      name: 'clothingEquipment',
      type: 'array',
      title: 'Klær og utstyr',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'routeImage',
      type: 'image',
      title: 'Løype',
    },
    {
      name: 'hikeImages',
      type: 'array',
      title: 'Bilder fra turen',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativ tekst',
            },{
              name: 'priority',
              type: 'number',
              title: 'Prioritet',
              description: 'Bilder med høyere tall vill bli vist først',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      title: 'placeName',
      subtitle: 'date',
      media: 'mainhikeImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection

      return {
        title: title,
        subtitle: new Date(subtitle).toLocaleDateString('no-NO', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ,
        media: media,
      }
    },
  },
}
