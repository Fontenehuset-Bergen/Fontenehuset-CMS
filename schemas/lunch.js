export default {
  name: 'lunchDishes',
  type: 'document',
  title: 'Lunsjretter',
  fields: [
    {
      name: "name",
      title: "Navn på lunchrett",
      type: "string",
      validation: rule => rule.required().min(3).max(20)
    },{
      name: 'allergies',
      title: 'Allergener',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Soya', value: 'soya'},
          {title: 'Melk', value: 'milk'},
          {title: 'Nøtter', value: 'nuts'},
          {title: 'Gluten', value: 'gluten'},
        ]
      }
    },{
      name: "desc",
      title: "Beskrivelse",
      type: "string",
    },{
      name: 'image',
      title: 'Bilde',
      type: 'image',
    },
  ]
}
