export default {
  name: "coffee",
  type: "document",
  title: "kaffe",
  fields: [
    {
      name: "name",
      title: "Navn på drikke",
      type: "string",
      validation: rule => rule.required().min(3).max(20)
    },{
      name: 'allergies',
      title: 'Allergener',
      type: 'array',
      of: [{type: 'string'}],
      layout: 'tags'
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