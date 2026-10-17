# V3 — Preferiti in localStorage

## Scope
Salvare i loghi preferiti in `localStorage`, con lista, miniature e conferma prima di togliere. Niente Gist in questa modifica.

## Cosa cambia
- Accanto al nome compare una stella (SVG): tocca per salvare il logo nei preferiti, tocca di nuovo per toglierlo (con conferma).
- Sotto il campo del seme compare la sezione «Preferiti» (solo se ce n'è almeno uno): miniature con nome, i più recenti in alto.
- Toccando una miniatura il seme torna nel campo, il logo grande si ridisegna e la pagina scorre in alto.
- Ogni miniatura ha una X per toglierla. Prima compare «Togliere «Nome» dai preferiti?» con i bottoni «Tienilo» e «Togli».
- Piccoli messaggi: «Salvato nei preferiti.», «Tolto dai preferiti.» e, se il browser non lascia salvare, «Il browser non mi lascia salvare: i preferiti non resteranno.»

## File toccati
- `index.html` (barra nome + stella, sezione preferiti, finestra di conferma `<dialog>`)
- `style.css` (stella e pulsanti rotondi, griglia delle miniature, finestra di conferma, `.btn.ghost`)
- `app.js` (caricamento/salvataggio, stella, lista, conferma; `paintLogo` separata da `drawLogo`)
- `sw.js` (cache `pixellogo-v4`)
- Dati: chiave `localStorage` `pixellogo.preferiti`; chiave `pixellogo.preferiti.backup` solo se i dati erano illeggibili.

## Come funziona ora
- Formato (stesso involucro della skill `sync-gist`):
  `{ "version": 1, "updatedAt": "ISO-8601", "data": { "favorites": [ { "seed", "name", "savedAt" } ] } }`
- Il logo non si salva: si ridisegna sempre dal seme. Il nome salvato è una copia di quello calcolato al momento.
- Un seme compare una sola volta, confrontato così com'è scritto (nessun trim: «niky» e «niky » sono diversi). Con seme vuoto la stella è disattivata.
- Ordine: il più recente in alto. Nessun limite di quantità.
- Dati illeggibili o con forma/versione sconosciuta: il contenuto grezzo viene copiato in `pixellogo.preferiti.backup`, poi si riparte da lista vuota (il backup si sovrascrive se succede di nuovo).
- Se `setItem` fallisce, la lista in memoria torna com'era e compare il messaggio di errore: niente falsi preferiti.
- Testi dell'utente (seme, nome) entrano solo con `textContent`/`setAttribute`/canvas, mai in `innerHTML`. L'unico `innerHTML` è l'SVG fisso della X.

## Impatti e dipendenze
- Se in futuro cambia l'algoritmo dei loghi o le liste dei nomi, i vecchi preferiti cambiano aspetto (il logo) e il nome mostrato resta quello salvato. Scelta A concordata: nessun campo di versione dell'algoritmo; se servirà, si aggiunge con una migrazione (`version` 2).
- La sincronizzazione col Gist (voce successiva) può inviare tale e quale il contenuto di `pixellogo.preferiti`. Pull/Push sovrascrivono con conferma, come da skill `sync-gist`: non serve unire due liste.
- Dopo un Pull bisognerà aggiornare `favorites` in memoria e richiamare `renderFavorites()`.

## Note mobile
- A 360px due miniature per riga; stella e X di 44px, miniature oltre i 44px. Nessuno scroll orizzontale.
- Su schermo largo le miniature si dispongono in più colonne (140px minimo).
- La conferma è un `<dialog>` modale; se il browser non lo supporta si usa `window.confirm`.
