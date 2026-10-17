# V6 — Content-Security-Policy

## Scope
Aggiungere una CSP all'app (miglioria 1 del controllo di sicurezza, giro 1): il browser deve permettere solo i file dell'app e le chiamate a GitHub.

## Cosa cambia
- Per chi usa l'app: niente di visibile.
- Il browser blocca script, immagini, font e connessioni da qualunque sito diverso dall'app e da GitHub. Anche se un giorno entrasse codice estraneo, non potrebbe mandare il token fuori.

## File toccati
- `index.html` (tag `<meta http-equiv="Content-Security-Policy">` subito dopo il viewport)
- `sw.js` (cache `pixellogo-v6`, perché `index.html` è in cache)

## Come funziona ora
- Regola: `default-src 'self'; connect-src 'self' https://api.github.com https://gist.githubusercontent.com; img-src 'self' data:; object-src 'none'; base-uri 'none'`.
- Significa: file solo dall'app stessa (script, stili, font, manifest, service worker); nessuno script o stile scritto dentro la pagina e niente `eval`; richieste di rete solo all'app, a `api.github.com` (sincronizzazione) e a `gist.githubusercontent.com` (file troncati); immagini dall'app o `data:`; niente plugin; niente cambi di indirizzo di base.
- Provato in un browser vero: uso normale senza nessuna violazione; script iniettato, `eval` in uno script della pagina, richiesta fetch, immagine e script da un sito estraneo, tutti bloccati.

## Impatti e dipendenze
- **Chi modifica l'app dopo deve rispettare la regola:** niente `<script>` o `<style>` dentro l'HTML, niente attributi `style="..."`, `onclick="..."` e simili, niente `eval`, niente CDN o nuovi siti. Un nuovo indirizzo esterno (per esempio un'altra API) va aggiunto a `connect-src`, altrimenti il browser lo blocca e in console compare «violates the following Content Security Policy directive».
- Cambiare lo stile da JavaScript con `elemento.style.proprieta = ...` resta permesso; scrivere `style="..."` in HTML o con `setAttribute('style', ...)` no.
- Una CSP in un tag `meta` non può impostare `frame-ancestors` (protezione dall'incorniciamento in altre pagine): se il servizio dove pubblichi permette di impostare intestazioni HTTP, è meglio metterla anche lì.
- Se la CSP viene tolta o cambiata, aumentare la cache in `sw.js`.

## Note mobile
- Nessun cambiamento: provato con service worker attivo e anche offline (l'app si apre e disegna il logo).
