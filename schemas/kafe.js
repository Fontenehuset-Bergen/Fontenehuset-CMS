export default {
    name: "kafe",
    type: "document",
    title: "Cafe",
    fields: [

        {
    name: "title",
    type: "string",
    title: "Overskrift"
        },
        {
            name: 'allergens',
            type: 'string',
            title: 'Allergener',
          },
          {
            name: "beskrivelse",
            type: "string",
            title: "Beskrivelser",
          },

          {
            name: 'image',
            type: 'image',
            title: 'Bilde',
          },




    ]
}