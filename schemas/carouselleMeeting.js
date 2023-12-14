export default {
  name: 'carouselleMeeting',
  type: 'document',
  title: 'Karusell Møter',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bilde',
    },
    {
      name: 'info',
      type: 'array',
      title: 'Info',
      of: [
        {type: "string"}
      ]
    },
  ],
}