import { Rule } from "sanity";

export default {
  name: "lunchDishes",
  type: "document",
  title: "Lunsjretter",
  fields: [
    {
      name: "id",
      title: "Trello ID",
      description:
        "Url i dette feltet kommer fra Trello API import tool og kan ikke manuelt endres.",
      type: "string",
      hidden: true,
      readOnly: true,
    },
    {
      name: "name",
      title: "Navn på matrett",
      type: "string",
      validation: (Rule: Rule) => Rule.required().min(3).max(100),
    },
    {
      name: "date",
      title: "Dato",
      type: "datetime",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "desc",
      title: "Beskrivelse",
      type: "text",
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
      name: "image",
      title: "Bilde",
      type: "image",
    },
    {
      name: "trelloImage",
      title: "Bilde fra trello (fallback)",
      description:
        "Url i dette feltet kommer fra Trello API import tool og kan ikke manuelt bli oppdatert. Hvis du ønsker å sitte et bilde så kan du bruke feltet over, det feltet blir sjekket først i appen.",
      type: "string",
      readOnly: true,
    },
  ],
};
