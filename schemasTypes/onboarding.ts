import { defineField, defineType } from "sanity";
export default defineType({
  name: "onboarding",
  type: "document",
  title: "Info til nye medlemmer",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Tittel",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Beskrivelse",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Bilde",
    }),
    defineField({
      name: "index",
      type: "number",
      title: "index",
    }),
  ],
  preview: {
    select: {
      title: "title",
      index: "index",
      media: "image",
    },
    prepare({ title, index, media }) {
      return {
        title,
        subtitle: index ? `#${index}` : "har ingen index!",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Index, først til sist",
      name: "IndexAsc",
      by: [{ field: "index", direction: "asc" }],
    },
    {
      title: "Index, sist til først",
      name: "indexDesc",
      by: [{ field: "index", direction: "desc" }],
    },
  ],
});
