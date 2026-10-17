# V5 — `.gitignore` per i rapporti di sicurezza

## Scope
Evitare che i rapporti `report-sicurezza-*.md` finiscano in un commit per sbaglio (miglioria 3 del controllo di sicurezza, giro 1).

## Cosa cambia
- Per chi usa l'app: niente.
- I file `report-sicurezza-*.md` restano nella cartella di lavoro ma Git li ignora, quindi `git add -A` non li prende.

## File toccati
- `.gitignore` (nuovo, una sola regola)
- Nessuna modifica ai file dell'app: la cache del service worker non cambia (`pixellogo-v5`).

## Come funziona ora
- La regola è `report-sicurezza-*.md`. Altri file `.md` non sono toccati.
- Il `.gitignore` non toglie file già tracciati: nessun rapporto è mai stato committato (verificato nel giro 1).

## Impatti e dipendenze
- Il repo è pubblico: i rapporti non vanno mai committati. Questa regola è una rete di sicurezza, non sostituisce l'attenzione.

## Note mobile
- Non applicabile.
