# 000 — Impostazione iniziale di PixelLogo

## Scope
Partire dal modello del repo e impostare PixelLogo: istruzioni compilate e scheletro della PWA, senza funzioni.

## Cosa cambia
- Chi apre l'app vede una pagina scura in stile Inventa con il marchio e una riga che dice che i loghi arriveranno con la prima modifica.
- L'app è installabile (PWA) e parte anche offline.

## File toccati
- `CLAUDE.md` (titolo, sezioni 1, 2, 7, 8 compilate; tolta la nota sul modello)
- `index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js` (cache `pixellogo-v1`), `icons/icon-192.png`, `icons/icon-512.png`
- `fonts/`: copiati tali e quali da `Inventa/fonts` (Unbounded, Space Grotesk, Press Start 2P, `fonts.css`, licenza OFL)
- `roadmap.md`
- Nessun dato salvato per ora.

## Come funziona ora
- `app.js` registra solo il service worker.
- `sw.js` mette in cache i file dell'app (cache first). A ogni modifica ai file in cache va aumentata la versione `CACHE`.
- Solo tema scuro, variabili colore e font in `:root` di `style.css`.

## Impatti e dipendenze
- Le icone sono provvisorie (cornice ciano 32x32 ingrandita): non sono un'icona definitiva.
- Non esiste ancora né il generatore né la sincronizzazione col Gist.

## Note mobile
- Controllato a 360px e a 1280px: nessuno scroll orizzontale, nessun errore in console, service worker attivo, font caricati.
