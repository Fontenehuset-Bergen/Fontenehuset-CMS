@AGENTS.md

# Claude Code i dette repoet

AGENTS.md, importert over, har reglene alle verktøy følger. Denne fila legger bare til det som gjelder spesielt for Claude Code.

## Hvordan arbeidet gjøres

Finnes `OPPGAVER.md` (personlig, ikke i git), les oppgaven derfra når et oppgavenummer nevnes.

1. **Les koden først.** Ikke planlegg ut fra hukommelsen eller oppgaveteksten alene. Koden kan ha endret seg.
2. **Avtal hva «ferdig» betyr** før arbeidet starter.
3. **Del opp større oppgaver** i mindre deler (A, B …), med én commit per del.
4. **Sjekk etterpå:** kjør sjekkene i AGENTS.md og si hva som er testet og hvordan.
5. **Avslutt:** oppdater dokumenter som endringen gjorde feil, for eksempel Gotchas i AGENTS.md.

Filer kan ha endret seg siden du sist leste dem. Les fila på nytt før du kommenterer den.

Personen godkjenner alt som endrer hvordan appen ser ut eller oppfører seg, og tar seg av git utover kommandoer som bare leser.

## Subagenter

Ligger i `.claude/agents/`. Ingen av dem kan redigere filer.

- `planner` – lager en plan før større endringer
- `reviewer` – leser en ferdig endring med friske øyne

Når reviewer er brukt, vis rapporten i sin helhet. Ikke oppsummer den.

## Scoped rules

Regler som bare gjelder én del av koden, ligger i `.claude/rules/` og lastes bare når Claude jobber med de filene. Ingen ennå. Flytt regler dit når de bare gjelder ett område.

## Personlige filer

Disse holdes utenfor git, og hver person har sine egne:

- `CLAUDE.local.md` – egne preferanser for dette prosjektet.
- `RESUME.md` – hvor arbeidet stoppet. Finnes den, les den først i en ny økt.
- `OPPGAVER.md` – egen oppgaveliste.
- `.claude/settings.local.json` – egne tillatelser.

Hold personlige detaljer utenfor de delte filene.

Hold denne fila og AGENTS.md under 200 linjer hver. Lengre filer koster kontekst i hver økt og blir fulgt dårligere.
