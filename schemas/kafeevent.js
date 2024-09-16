export default {
    name: "kafeevent",
    type: "document",
    title: "Event",
    fields: [
        {
            name: 'image',
            type: 'image',
            title: 'Bilde',
          },

            {
                title: 'Event',
                name: 'eventDate',
                type: 'date',
                options: {
                  dateFormat: 'MM-DD',
                  calendarTodayLabel: 'Today'
                }
              },
              {
                title: 'Description',
                name: 'description',
                type: 'text'
              }


    ]
}