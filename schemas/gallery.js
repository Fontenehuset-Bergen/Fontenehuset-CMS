export default {
  name: 'gallery',
  type: 'document',
  title: 'Bilde Galleri',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Kategori',
      description: 'Navn på kategori',
      validation: rule => [
        rule.required().error('Feltet må være fylt ut'),
        rule.custom(name => {
          if (typeof name === 'undefined') return true
          if (name.includes(" ")) {
            return "Feltet kan ikke inneholde mellomrom"
          }

          return true
        }).error()
      ]
    },
    {
      name: 'images',
      type: 'array',
      title: 'Bilder',
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      image: 'images.0.asset',
    },
    prepare(selection) {
      const { title, images, image } = selection

      return {
        title: title ?? 'Midlertidig titel',
        subtitle: images ? `Inneholder ${Object.keys(images).length} bilde${Object.keys(images).length > 1 ? 'r' : ''}` : "",
        media: image,
      }
    },
  },
}
