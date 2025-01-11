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
   
    /*{
      name: 'subject',
      type: 'string',
      title: 'Område',
    },*/

    {
      title: "Kategori",
      description: "Hvilken kategori tilhører dette?",
      name: "subject",
      type: "string",
      options: {
        list: [
          { title: "Kontor", value: "Kontor" },
          { title: "Media", value: "Media" },
          { title: "Kjøkken", value: "Kjøkken" },
          { title: "Ut av huset", value: "Ut av huset" },
          { title: "Onsdager", value: "Kjøkken" },
          { title: "Spesielle møter", value: "Spesielle møter" },
          { title: "Workshops", value: "Workshops" },
          { title: "Tur", value: "Tur" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ingress',
      type: 'string',
      title: 'Ingress',
      validation: Rule => Rule.max(150).error('Maximum length is 150 characters')
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