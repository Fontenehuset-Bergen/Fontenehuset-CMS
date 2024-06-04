export default {
  name: 'newMember',
  type: 'document',
  title: 'Nye medlemmer',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
    },
    {
      name: 'paragraph',
      type: 'text',
      title: 'Kort beskrivelse',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bilde',
    },
  ],
}
