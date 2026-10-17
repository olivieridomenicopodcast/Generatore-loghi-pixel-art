# webapp-starter

Modello di partenza per webapp con Claude Code: regole di lavoro, skill e template già pronti, così ogni progetto parte con un assistente che sa come lavori.
Pensato per webapp statiche (HTML/CSS/JS, PWA) con dati in `localStorage` e sincronizzazione su GitHub Gist con token.

> Il repo è pubblico: non metterci mai token, chiavi o dati di persone.

## Come si usa
1. Per una webapp nuova: **Use this template** (o copia il contenuto in un repo nuovo) e collegalo a una sessione di Claude Code.
2. Scrivi a Claude Code: «imposta una webapp nuova». Parte la skill `nuova-webapp`: ti fa 5 domande e compila `CLAUDE.md`.
3. Per ogni modifica usa il prompt in 4 parti (`docs/PROMPT-4-PARTI.md`).
4. A fine lavoro Claude Code chiude con `chiudere-una-modifica`: verifica, scheda in `sprint/`, `roadmap.md`, resoconto.
5. Prima di pubblicare: apri una **sessione nuova** e usa `check-sicurezza` o `docs/PROMPT-SECONDO-PARERE.md`.

## Cosa c'è dentro
| File | A cosa serve |
|---|---|
| `CLAUDE.md` | Istruzioni permanenti, da compilare per ogni progetto |
| `.claude/skills/nuova-webapp` | Imposta il progetto con 5 domande |
| `.claude/skills/chiudere-una-modifica` | Verifica e documenta a fine lavoro |
| `.claude/skills/sync-gist` | Come salvare e sincronizzare i dati col Gist, in sicurezza |
| `.claude/skills/check-sicurezza` | Controllo di base in sola lettura prima di pubblicare |
| `sprint/` | Una scheda per ogni modifica |
| `docs/` | Guida rapida in PDF, prompt in 4 parti, prompt del secondo parere, i tre stili grafici (Olivieri Domenico, Inventa, Tavolo da gioco) |
| `roadmap.md` | Cosa è previsto e cosa è fatto |
| `extra-supabase/` | Solo se una webapp avrà un database Supabase: non viene caricato di default |

## Origine
Adattato dal kit del workshop «Il metodo che usiamo in Marketers per costruire app e tool con l'AI» (Marketers World 2026, Elio Amato e Pierdomenico Amodei), pensato per Lovable e Supabase, tradotto per Claude Code e webapp statiche.
