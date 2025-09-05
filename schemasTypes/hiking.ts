import { Rule } from "sanity";

export default {
  name: "hiking",
  type: "document",
  title: "Turer",
  fields: [
    {
      type: "image",
      name: "mainhikeImage",
      title: "Hovedturbilde",
      description:
        "Bruk et bilde som representerer turen, gjerne fra området. Blir vist over tittel i applikasjonen",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: "datetime",
      name: "date",
      title: "Dato",
      description:
        "Bruk tidspunket hvor oppmøte er ønsket",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "placeName",
      title: "Tursted",
      description:
        "Navn på denne turen slik den skal vises i applikasjonen, dette kan gjerne være et internt kallenavn eller navn på område",
      validation: (Rule: Rule) => Rule.required().min(10).max(30),
    },
    {
      name: "description",
      type: "text",
      title: "Turbeskrivelse",
      description: "Her kan du skrive en detaljert beskrivelse av turen",
    },
    {
      type: "string",
      name: "difficulty",
      title: "Vanskelighetsgrad",
      description:
        "Hvor vanskelig er det å gjennomføre turen. Bruk DNT sin gradering hvis mulig.",
      options: {
        list: [
          { title: "Vanskelig", value: "vanskelig" },
          { title: "Middels", value: "middels" },
          { title: "Lett", value: "lett" },
        ],
        layout: "radio",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: "string", // todo: endre til number og ligg på input validering
      name: "timeUse",
      title: "Tidsbruk",
      description:
        "Hvor lenge varer turen, oppgitt i timer. Du kan bruke desimaler, e.g 3.5",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: "string", // todo: endre til number og ligg på input validering
      name: "height",
      title: "Høyde",
      description: "Hvor stor høydeforskjell er turen, oppgitt i meter",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: "string", // todo: endre til number og ligg på input validering
      name: "distance",
      title: "Distanse",
      description: "Hvor langt går turen, oppgitt i kilometer",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: "string", // todo: konverter til yr.no integrering
      name: "weather",
      title: "Vær",
      description:
        "Hvis værvarsel er tilgengelig for denne turen kan du skrive et kort sammendrag her",
      validation: (Rule: Rule) =>
        Rule.max(20).warning(
          "Dette feltet er presset på plass og bør ha korte setninger",
        ),
    },
    {
      type: "string",
      name: "access",
      title: "Adkomst",
      description:
        "Hvor skal deltagerne møte opp og hvordan kommer dere fram til tur området",
    },
    {
      type: "string",
      name: "placesStop",
      title: "Stoppesteder",
      description: "Eventuelle pause eller stoppe steder under turen",
    },
    {
      type: "string",
      name: "endpoint",
      title: "Endepunkt",
      description:
        "Hvor ender turen opp når vi er ferdig og hvordan kommer deltagerene seg hjem",
    },
    {
      type: "image",
      name: "routeImage",
      title: "Løype",
      description:
        "Her kan du laste opp et kart (bilde) av turløypen mens vi jobber med integrering med ut.no",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: "image",
      name: "destinationImage",
      title: "Destinasjonsbilde",
      description: "Her kan du laste opp et bilde som er tatt i området",
    },
    {
      type: "array",
      name: "clothingEquipment",
      title: "Klær og utstyr",
      description:
        "Her kan du laste opp eller velge bilder av tur-utstyr fra vårt galleri",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "hikeImages",
      title: "Bilder fra turen",
      description:
        "Etter turen har blitt gjennomført kan du laste opp bilder i dette feltet for å opprette et bildegalleri i applikasjonen.",
      of: [
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternativ tekst",
            },
            {
              name: "priority",
              type: "number",
              title: "Prioritet",
              description: "Bilder med høyere tall vill bli vist først",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    },
  ],
  preview: {
    select: {
      title: "placeName",
      subtitle: "date",
      media: "mainhikeImage",
    },
    prepare(selection: Record<string, any>) {
      const { title, subtitle, media } = selection;

      return {
        title: title,
        subtitle: new Date(subtitle).toLocaleDateString("no-NO", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        media: media,
      };
    },
  },
};
