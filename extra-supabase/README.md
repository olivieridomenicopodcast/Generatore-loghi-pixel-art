# Solo se una webapp usa Supabase

Questa cartella **non viene caricata di default**: dentro `.claude/skills/` Claude Code legge le skill, qui no.
Se una webapp avrà un database Supabase (login, più utenti, dati di altre persone):

1. Copia la cartella `permessi-database/` in `.claude/skills/` del progetto.
2. Aggiungi al `CLAUDE.md` del progetto una sezione «Database e sicurezza (Supabase)» con le regole della skill.
3. Per il controllo di sicurezza usa la skill originale del workshop (React + Vite + Supabase), che copre RLS, GRANT, funzioni ed edge function: github.com/pamodei-ops/check-sicurezza.
