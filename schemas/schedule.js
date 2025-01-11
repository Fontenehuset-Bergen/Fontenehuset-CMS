export default {
  name: 'events',
  type: 'document',
  title: 'Uke',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
    },
   /* {
      name: 'subject',
      type: 'string',
      title: 'Område',
      description: 'Hvilken avdeling gjelder møtet?'
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
      name: 'description',
      type: 'string',
      title: 'Beskrivelse',
      description: 'Beskriv gjerne dagens agenda eller annen informasjon om møtet'
    },
    {
      name: 'time',
      type: 'datetime',
      title: 'Tidspunkt',
    },
    {
      name: 'duration',
      type: 'number',
      title: 'Varighet',
      description: 'Hvor mange minutter varer møtet?',
      validation: rule => rule.required().min(10).max(480).warning('Sjekk at varighet gir mening')
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bilde',
    },
  ],
}