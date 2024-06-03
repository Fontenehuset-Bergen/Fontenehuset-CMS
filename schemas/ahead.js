export default {
  name: 'ahead',
  type: 'document',
  title: 'Fremover',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
    },
    {
      name: 'subject',
      type: 'string',
      title: 'Område',
    },
    {
      name: 'description',
      type: 'string',
      title: 'Beskrivelse',
    },
    {
      name: 'time',
      type: 'datetime',
      title: 'Tidspunkt',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bilde',
    },
  ],
}