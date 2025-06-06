export default {
  name: "onboarding",
  type: "document",
  title: "Info til nye medlemmer",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
    },
    {
      name: "description",
      type: "string",
      title: "Beskrivelse",
    },
    {
      name: "image",
      type: "image",
      title: "Bilde",
    },
    {
      name: "index",
      type: "number",
      title: "index",
    },
  ],
  preview: {
    select: {
      title: "title",
      index: "index",
      media: "image",
    },
    prepare({ title, index, media }: Record<string, unknown>) {
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
};
