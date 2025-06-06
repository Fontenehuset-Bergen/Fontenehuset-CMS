import { Rule } from "sanity";

export default {
  name: "ahead",
  type: "document",
  title: "Fremover",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
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
          { title: "Administrasjon", value: "Administrasjon" },
          { title: "Møter", value: "Møter" },
          { title: "Media", value: "Media" },
          { title: "Kjøkken", value: "Kjøkken" },
          { title: "Ut av huset", value: "UtAvHuset" },
          { title: "Onsdager", value: "Onsdager" },
          { title: "Spesielle møter", value: "SpesielleMøter" },
          { title: "Workshops", value: "Workshops" },
          { title: "Tur", value: "Tur" },
          { title: "Kafe", value: "Kafe" },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "ingress",
      type: "string",
      title: "Ingress",
      validation: (Rule: Rule) =>
        Rule.max(150).error("Maximum length is 150 characters"),
    },
    {
      name: "description",
      type: "string",
      title: "Beskrivelse",
    },
    {
      name: "time",
      type: "datetime",
      title: "Tidspunkt",
    },
    {
      name: "timeend",
      type: "datetime",
      title: "Slutt-tidspunkt",
    },
    {
      name: "image",
      type: "image",
      title: "Bilde",
    },
  ],
};
