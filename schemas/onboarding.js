export default {
  name: 'onboarding',
  type: 'document',
  title: 'Info til nye medlemmer',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
    },
   
    {
      name: 'description',
      type: 'string',
      title: 'Beskrivelse',
    },
  
    {
      name: 'image',
      type: 'image',
      title: 'Bilde',
    },

    {
      name: 'index',
      type: 'number',
      title: 'index',
    },
  ],
}