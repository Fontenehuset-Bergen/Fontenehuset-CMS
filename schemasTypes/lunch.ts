import { Rule } from "sanity";

export default {
  name: "lunchDishes",
  type: "document",
  title: "Lunsjretter",
  fields: [
    {
      name: "name",
      title: "Navn på lunchrett",
      type: "string",
      validation: (Rule: Rule) => Rule.required().min(3).max(100),
    },
    {
      name: "allergies",
      title: "Allergener",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Gluten", value: "gluten" },
          { title: "Skalldyr", value: "skalldyr" },
          { title: "Egg", value: "egg" },
          { title: "Fisk", value: "fisk" },
          { title: "Peanøtter", value: "peanøtter" },
          { title: "Soya", value: "soya" },
          { title: "Melk", value: "melk" },
          { title: "Nøtter", value: "nøtter" },
          { title: "Selleri", value: "selleri" },
          { title: "Sennep", value: "sennep" },
          { title: "Sesamfrø", value: "sesamfrø" },
          { title: "Svoveldioksid og sulfitter", value: "svovel" },
          { title: "Lupin", value: "lupin" },
          { title: "Bløtdyr", value: "bløtdyr" },
          { title: "Sjømatkrydder", value: "sjømatkrydder" },
        ],
      },
    },
    {
      name: "desc",
      title: "Beskrivelse",
      type: "text",
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
    },
  ],
};
