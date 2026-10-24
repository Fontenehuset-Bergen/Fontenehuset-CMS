# Fontenehuset-CMS

Sanity Studio for Fontenehuset Bergen. Her redigeres innholdet som mobilappen (fontenehuset-new-app) viser: lunsj, aktiviteter, turer, galleri, introduksjon osv. Studioet har også et eget verktøy som henter lunsjretter fra Trello.

Denne fila har reglene som alle AI-kodeverktøy skal følge i dette repoet. Claude Code leser den via CLAUDE.md.

## Stack

- Sanity Studio 4 (4.22.1 etter `npm audit fix` 24.10.2026), med `@sanity/ui` og `@sanity/vision`
- React 19.1.1, styled-components 6
- TypeScript 5 (`^5.1.6`)
- Prettier (oppsettet ligger i `package.json`, bl.a. enkle anførselstegn i JSX)
- Trello API (via `hooks/trello/`)
## Kommandoer

```
npm run dev                          # starter Studio lokalt
npm run validate                     # sjekker at alle schemas er gyldige
npm run build                        # bygger Studio
npx tsc --noEmit --incremental false # typesjekk
```

`npm run typegen` kjører validering og lager typer, men peker på feil mappe foreløpig (FHS-21).

Lint og tester er ikke satt opp ennå (se FHS-23).

**Kjør aldri `npm run deploy` eller `npm run deploy-graphql`.** De publiserer Studio og GraphQL-API-et for alle. Deploy skjer via GitHub Actions.

## Før en endring er ferdig

- `npm run validate` skal gå uten feil.
- Typesjekken skal gå uten feil.
- Test i Studio lokalt: åpne dokumenttypen som er endret, og prøv å lagre.
- Si hva som er sjekket og hvordan. En grønn typesjekk betyr ikke at det virker.

## Hvor koden ligger

- `schemasTypes/` – dokumenttyper og felt. Registreres i `schemasTypes/index.ts`.
- `tools/` – egne verktøy i Studio (f.eks. Trello-import)
- `hooks/` – `useSanity` og `useTrello`
- `components/` – React-komponenter brukt i verktøyene
- `context/` – React-kontekst (`SanityProvider`)
- `types/` – typer
- `sanity.config.ts` – oppsettet til Studio
- `.github/workflows/` – validering og deploy

## Konvensjoner

- **Schemas:** Bruk `defineType` og `defineField`. Da får TypeScript riktige typer (FHS-37).
- **Validering:** `.warning()` til slutt i en regelkjede gjør hele kjeden til en advarsel. Skal noe være påkrevd, del i to regler i en array (FHS-04).
- **GROQ:** Sett aldri verdier rett inn i spørringen. Bruk parametere: `*[_type == "x" && id == $id]` (FHS-09).
- **React-state:** Ikke endre objekter i state direkte. Lag nye objekter og sett state på nytt (FHS-06).
- **Feil:** Fang `err instanceof Error`, og vis feilen i grensesnittet (FHS-07).
- **Språk:** Teksten i Studio er på norsk. Bruk locale `nb-NO`.

## Avhengigheter

Ikke legg til, fjern eller oppgrader pakker uten at teamet er enig.

## Git

- `main` og `development` endres ikke uten godkjenning fra teamet.
- Aldri commit, push, merge, rebase, reset, stash eller `git add` uten at et menneske ber om det.
- `git status`, `git diff` og `git log` er alltid greit.
- Dekker en commit flere oppgaver, skriv alle oppgavenumrene i meldinga.

## Hvor funn skal skrives ned

Skriv ned et funn én gang, der neste person vil lete etter det.

| Hva du fant                                   | Hvor det skal                                                 |
| --------------------------------------------- | ------------------------------------------------------------- |
| En feil i koden du jobber med                 | Nevn den med fil og linje                                     |
| En feil eller løs tråd utenfor oppgaven       | Foreslå et nytt FHS-punkt med kort beskrivelse                |
| En beslutning med alternativer verdt å huske  | Skriv kort hva som ble valgt, hva som ble vurdert, og hvorfor |
| En felle som vil bite igjen                   | Gotchas nedenfor                                              |
| Et verifisert faktum om et verktøy/bibliotek  | Skriv det ned med versjonen det ble sjekket mot               |

## Gotchas

- **Appen leser disse dataene.** Endrer du et felt, en verdi eller en dokumenttype, kan mobilappen slutte å vise innholdet. Sjekk hvordan appen bruker feltet først.
- **Verdier i `options.list` er lagret data.** Endrer du en verdi (f.eks. «Kjøkken»), passer ikke eksisterende dokumenter lenger. Det krever migrering (FHS-25).
- **`SANITY_STUDIO_*`-variabler havner i nettleseren.** Alle som åpner Studio kan lese dem. Aldri legg hemmeligheter der (FHS-01).
- **Mappa heter `schemasTypes/`** (skrivefeil for `schemaTypes`). Ikke gi den nytt navn uten teamet. `sanity-typegen.json` og README peker feil (FHS-21).
- **ESLint 9 leser ikke `.eslintrc`.** Lint virker ikke før det finnes en `eslint.config.mjs` (FHS-23).
- **Opprydding i Trello-verktøyet sletter alle lunsjretter eldre enn 7 dager**, også de som er laget manuelt (FHS-15).
- **Deploy kjører uten validering** (FHS-26).
- **Kjør aldri `npm audit fix --force`.** Den gjør store versjonshopp som kan ødelegge Studio. Vanlig `npm audit fix` er greit. 9 varsler (6 høy, 3 moderat) er igjen per 24.10.2026, men alle ligger i CLI- og byggeverktøy, ikke i selve Studio. De forsvinner ikke helt, heller ikke på nyeste Sanity.
- **`@sanity/vision` må ha samme versjon som `sanity`.** Ellers spør `npm run build` om å oppgradere. Installer da med `npm install --legacy-peer-deps @sanity/vision@<versjon>` (sjekket mot Sanity 4.22.1).
- **Ufarlige varsler:** `ERESOLVE overriding peer dependency`, «Update available» til en ny hovedversjon, og at esbuild sitt install-script blir blokkert. Build virker likevel. Oppgradering til Sanity 5 eller nyere er en egen teamavklaring.
- **Det publiserte Studio oppdaterer seg selv** (`autoUpdates: true`) og henter Sanity-kode fra Sanitys CDN. Det kan altså kjøre en annen Sanity-versjon enn den lokale.
- **`TrelloProvider` må ligge inne i `SanityProvider`** (`tools/trello/wrapper.tsx`), fordi `useTrello` bruker `useSanityContext`. Bytter du rekkefølgen, krasjer Trello-verktøyet med en context-feil.