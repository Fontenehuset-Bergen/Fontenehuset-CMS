export default {
  name: 'lunchDishes',
  type: 'document',
  title: 'Lunsjretter',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Matrett',
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Dato',
    },
    {
      name: 'allergens',
      type: 'string',
      title: 'Allergener',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bilde',
    },
  ],
}
