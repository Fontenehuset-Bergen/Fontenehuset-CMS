export default {
  name: "imagepages",
  type: "document",
  title: "Image Pages",
  fields: [
    {
      name: "tur",
      type: "array",
      title: "Tur",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Bilder fra turer",
    },
    {
      name: "kafe",
      type: "array",
      title: "Kafe",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Bilder fra kafe",
    },
    {
      name: "huset",
      type: "array",
      title: "Huset",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Bilder fra huset",
    },
    {
      name: "morsomt",
      type: "array",
      title: "Morsomt",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Morsomme bilder",
    },
  ],
};
