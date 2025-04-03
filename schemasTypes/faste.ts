import { Rule } from "sanity";

export default {
  name: "faste",
  type: "document",
  title: "Uke: Faste møter",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
    },
    {
      name: "subject",
      type: "string",
      title: "Område",
      description: "Hvilken avdeling gjelder møtet?",
    },
    {
      name: "description",
      type: "string",
      title: "Beskrivelse",
      description:
        "Beskriv gjerne dagens agenda eller annen informasjon om møtet",
    },
    {
      name: "time",
      type: "datetime",
      title: "Tidspunkt",
    },
    {
      name: "duration",
      type: "number",
      title: "Varighet",
      description: "Hvor mange minutter varer møtet?",
      validation: (Rule: Rule) =>
        Rule
          .required()
          .min(10)
          .max(480)
          .warning("Sjekk at varighet gir mening"),
    },
    {
      name: "image",
      type: "image",
      title: "Bilde",
    },
  ],
};
