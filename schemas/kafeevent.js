export default {
    name: "kafeevent",
    type: "document",
    title: "Event",
    fields: [

            {
                title: 'Event',
                name: 'releaseDate',
                type: 'date',
                options: {
                  dateFormat: 'MM-DD',
                  calendarTodayLabel: 'Today'
                }
              }


    ]
}