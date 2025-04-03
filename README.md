# Sanity Studio for Fontenehuset mobil app
Velkommen til Fontenehuset sitt Sanity studio, for spørsmål kan du referere til Fontenehuset-Bergen sitt Github [Discussion board](https://github.com/orgs/Fontenehuset-Bergen/discussions) eller til vår [wiki artikkel](https://github.com/Fontenehuset-Bergen/fontenehuset-new-app/wiki/5.-Sanity-CMS) i fontenehuset-new-app repo'et. Hvis dette ikke svarer på spørsmålt ditt kan du lage en issue eller en ny thread i discussion board.

# Lokal utvikling
Du kan begynne med å clone repository, etter dette må du installere alle nødvendige moduler med følgende kommando
```console
npm run i
```
Etter dette får du full tilgang til [Sanity CLI](https://www.sanity.io/docs/cli) i terminalen som har deg blant annet verifisere schema og laste opp lokal kode til content lake

# Validering av skjema
Etter du har gjort endringer i schema files må du verifisere at endringene dine fungerer, dette gjør du først ved å kjøre kommandoen
```console
npm run validate
```
Etter dette kan du verifisere at Sanity Studio bygger korrekt med kommandoen
```console
npm run build
```

# Github Actions
Når du dytter opp endringer til `main` branch så vill en del automatiske prosseser ta over slik at du ikke trenger å tenke på deployment og slikt. Venligst følg med på din pull request og at alle status checks består.
Hvis du opplever noen problemer på dette steget kan du ta kontakt med @kunkristoffer eller noen andre i __Back-end__ gruppen

Følgende prosesser er automatisk ved PR til main
- Validering
- Deployment

# Etikett
Når du skal jobbe med et problem, sørg først for at du har en aktiv [issue tracker](https://github.com/Fontenehuset-Bergen/Fontenehuset-CMS/issues) og at du linker din pull request til dette. Alle issues skal ligges til i [Kodeloftet app-utvikling](https://github.com/orgs/Fontenehuset-Bergen/projects/1) prosjektet.

Endringer kan ikke pushes rett til `main` branch, bruk istedet pull requests til å merge din branch med `development` branch. Når alle status checks har bestått kan da koden merges inn til `main`

>[!NOTE]
>Hvis du er usikker kan du bruke `@<navn>` til å notifisere en bruker slik at de kan se på endringene.