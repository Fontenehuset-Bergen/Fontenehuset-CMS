# RESUME

<!--
INSTRUKS TIL CLAUDE – behold hele denne kommentaren uendret øverst i hver nye versjon.

Denne fila sier hvor arbeidet stoppet. Les den først i hver ny økt.

Når Kristoffer sier «skriv RESUME»:
1. Sjekk faktisk status med `git status -sb` og `git log --oneline -5`. Ikke skriv fra hukommelsen.
2. Skriv HELE den nye fila i én kodeblokk, med denne kommentaren øverst. Kristoffer erstatter hele fila selv.
3. Skriv det som et skript, ikke et sammendrag: eksakte kommandoer, fil- og funksjonsnavn, neste konkrete steg.
4. Bruk samme overskrifter som under. Skriv «ingen» hvis en del er tom.
5. Ta bare med det som trengs for å fortsette. Ferdige ting som er committet, står allerede i git log.
6. Bruk fire backticks (````) rundt hele fila, fordi den selv inneholder kodeblokker med tre.
-->

## Sist oppdatert

24.10.2026

## Branch og siste commit

- Branch: `Test-Shiro-leker-studio` (5 commits foran `origin`, ikke pushet)
- Siste commit: `2b2b3fc FHS-03 fix: correct value for "Onsdager" category in schedule schema`

## Kom i gang

```powershell
cd C:\Users\krist\Fontenehuset\Fontenehuset-CMS
git status -sb
git log --oneline -5
npm run validate                        # skal gi 0 feil, 0 advarsler
npx tsc --noEmit --incremental false    # skal gi 0 feil
```

## Hva som er gjort sist

- FHS-03 er løst (commit `2b2b3fc`): «Onsdager» har nå `value: "Onsdager"` i `schemasTypes/schedule.ts:31`. Validering og typesjekk er grønne.
- Beslutning: ingen migrering. Det er ikke mulig å vite hvilke gamle «Kjøkken»-dokumenter som egentlig var «Onsdager». `"Kjøkken"` er fortsatt en gyldig verdi, og `events` er ukeoppføringer som blir gamle av seg selv.
- Appen påvirkes ikke. `events.subject` vises bare som tekst i `card.tsx:46` og `modal.tsx:17` under `fontenehuset-new-app/src/components/ui/cards/events/`.
- I AGENTS.md viser Gotcha-punktet om `options.list` nå bare til FHS-25.

## Ikke committet ennå

ingen

## Neste steg

1. Oppdater `OPPGAVER.md`. Fila er personlig og ligger ikke i git.
   - Merk FHS-02 som løst.
   - Fjern «`npx tsc …` feiler (se FHS-02)» i linje 6.
   - Merk FHS-03 som løst, med notatet «ingen migrering: gamle verdier kan ikke skilles, og dataene blir gamle av seg selv».
2. Start på FHS-04: `.warning()` til slutt i regelkjeden gjør at `required()` bare blir en advarsel.
   - Gjelder `schemasTypes/faste.ts:37-41` og `schemasTypes/schedule.ts:56-60` (feltet «Varighet»).
   - Løsning: del regelen i en array, slik `gallery.ts` gjør: `[Rule.required(), Rule.min(10).max(480).warning(...)]`.
   - Les begge filene og `gallery.ts` først.
   - Endringen gjør «Varighet» påkrevd. Det endrer hvordan Studio oppfører seg, så Kristoffer må godkjenne det før arbeidet starter.

## Testes senere

- FHS-02 i Studio (`npm run dev` → «Info til nye medlemmer»):
  - Lista viser tittel, `#index` og bilde.
  - Begge sorteringene virker.
  - Et dokument kan lagres.
- FHS-03 i Studio (`npm run dev` → «Uke»):
  - Velg «Onsdager» og lagre.
  - Kjør `*[_type=="events"]{title, subject}` i Vision og sjekk at `subject` er `"Onsdager"`.
  - Et gammelt «Kjøkken»-dokument åpnes uten valideringsfeil.

## Venter på teamet

- **FHS-01** (Trello-nøkkel og token lekker i Studio). Teamet må bestemme:
  1. Hvor serverfunksjonen/proxyen skal kjøre (f.eks. Vercel, Netlify eller Cloudflare).
  2. Hvem som lager nytt Trello-token og sletter det gamle. Krever tilgang til Trello-kontoen.
  3. Hvordan serverfunksjonen beskyttes, så bare Studio-brukere kan kalle den.
  - Viktig: Lag ikke nytt token før koden er flyttet. Ellers lekker det nye tokenet ved neste deploy.
  - Kodestegene etterpå: skriv serverfunksjonen, la `useTrello.ts` kalle den, og fjern `SANITY_STUDIO_TRELLO_*` fra `deploy-sanity.yml`.
  - Claude kan skrive et kort notat om saken til teammøtet hvis du ber om det.
- **FHS-39** (`appId` mangler): krever tilgang til sanity.io/manage.
- **Til appteamet:** kjør typegen i `fontenehuset-new-app` på nytt. `Events.subject` i `src/types/sanity.types.ts:268-277` mangler `"Onsdager"` og har `"Kjøkken"` to ganger.

## Husk

- FHS-01 er utenfor det Kristoffer kan fra før. Forklar enkelt og steg for steg når punktet tas opp igjen.
- Å flytte koden til en annen mappe eller gi variablene nye navn retter ikke FHS-01. Alt i Studio kjører i nettleseren.
- Mulig nytt FHS-punkt: `onboarding.ts:37` (`index ? … : "har ingen index!"`) viser «har ingen index!» når `index = 0`.
