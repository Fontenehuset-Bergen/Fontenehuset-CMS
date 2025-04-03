import { Rule } from "sanity";

export default {
  name: "kafe",
  type: "document",
  title: "Cafe",
  fields: [
    {
      name: "title",
      title: "Navn på drikke",
      type: "string",
      validation: (Rule: Rule) => Rule.required().min(3).max(20),
    },
    {
      name: "allergens",
      title: "Allergener",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Soya", value: "soya" },
          { title: "Melk", value: "milk" },
          { title: "Nøtter", value: "nuts" },
          { title: "Gluten", value: "gluten" },
        ],
      },
    },
    {
      name: "beskrivelse",
      title: "Beskrivelse",
      type: "string",
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
    },
  ],
};
