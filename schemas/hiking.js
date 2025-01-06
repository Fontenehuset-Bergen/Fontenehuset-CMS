export default {
    name: 'hiking',
    type: 'document',
    title: 'Turer',
    fields: [
        // {
        //     name: 'destinationImage',
        //     type: 'image',
        //     title: 'Destinasjonsbilde',
        //   },
          {
            name: 'placeName',
            type: 'string',
            title: 'Tursted',
          },
          {
            name: 'date',
            type: 'datetime',
            title: 'Dato',
          },
          {
            name: 'difficultyLevel',
            type: 'string',
            title: 'Vanskelighetsgrad',
          },
          {
            name: 'timeUse',
            type: 'string',
            title: 'Tidsbruk',
          },
          {
            name: 'height',
            type: 'string',
            title: 'Høyde',
          },
          {
            name: 'distance',
            type: 'string',
            title: 'Distanse',
          },
          {
            name: 'weather',
            type: 'string',
            title: 'Vær',
          },
          {
            name: 'description',
            type: 'string',
            title: 'Turbeskrivelse',
          },
          {
            name: 'access',
            type: 'string',
            title: 'Adkomst',
          },
          {
            name: 'placesStop',
            type: 'string',
            title: 'Stoppesteder',
          },
  
        {
          name: 'clothingEquipment',
          type: 'array',
          title: 'Klær og utstyr',
          of: [
          
            {
              type: 'object',
              fields: [
            
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true // Enables image cropping
                  }
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string'
                }
              ],
            }
          ]
        },

          

                {
                  name: 'destinationMap',
                  type: 'string',
                  title: 'Destinasjonskart',
                },
                {
                  name: 'latitude',
                  type: 'number',
                  title: 'Breddegrad',
                },
                {
                  name: 'longitude',
                  type: 'number',
                  title: 'Lengdegrad',
                },
                {
                  name: 'mainhikeImage',
                  type: 'image',
                  title: 'Hovedturbilde',
                },
                {
                  name: 'routeImage',
                  type: 'image',
                  title: 'Løype',
                },
                {
                  name: 'hikeImages',
                  type: 'array',
                  title: 'Bilder fra turen',
                  of: [
          
                    {
                      type: 'object',
                      fields: [
                    
                        {
                          name: 'image',
                          title: 'Image',
                          type: 'image',
                          options: {
                            hotspot: true // Enables image cropping
                          }
                        }
                      ],
                    }
                  ]
                },

                
    ],
  }

  // hikeImages og clothingEquipment byttes ut og hentes fra andre ressurser istedet for image
  // destinationMap og routeImage byttes ut med interaktiv iframe senere
  