import { Rule } from "sanity";

export default {
  name: "lunchDishes",
  type: "document",
  title: "Lunsjretter",
  fields: [
    {
      name: "id",
      title: "Trello ID",
      hidden: true,
      type: "string",
    },
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
          { title: "Bløtdyr", value: "bløtdyr" },
          { title: "Egg", value: "egg" },
          { title: "Fisk", value: "fisk" },
          { title: "Gluten", value: "gluten" },
          { title: "Laktose", value: "laktose" },
          { title: "Lupin", value: "lupin" },
          { title: "Melk", value: "melk" },
          { title: "Nøtter", value: "nøtter" },
          { title: "Peanøtter", value: "peanøtter" },
          { title: "Selleri", value: "selleri" },
          { title: "Sennep", value: "sennep" },
          { title: "Sesamfrø", value: "sesamfrø" },
          { title: "Sjømatkrydder", value: "sjømatkrydder" },
          { title: "Skalldyr", value: "skalldyr" },
          { title: "Soya", value: "soya" },
          { title: "Svoveldioksid og sulfitter", value: "svovel" },
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
