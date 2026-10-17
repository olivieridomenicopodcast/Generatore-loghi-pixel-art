# V4 — Sincronizzazione dei preferiti su un Gist privato

## Scope
Pull e push manuali dei preferiti su un Gist privato di GitHub, con token inserito a mano dalle impostazioni. Segue la skill `sync-gist`.

## Cosa cambia
- In alto a destra c'è un'icona a ingranaggio che apre la finestra «Sincronizzazione».
- Nella finestra: campo token (password) con «Salva token» e «Rimuovi token», bottoni «Scarica dal Gist» e «Invia al Gist», riga di stato («Mai sincronizzato.», «Modifiche non inviate.», «Sincronizzato alle HH:MM.») e riga dei messaggi.
- Spiegazioni nella finestra: il Gist «segreto» si legge con il link; serve un token classic con il solo permesso `gist`; il token resta sul dispositivo e se trapela va revocato.

## File toccati
- `index.html` (ingranaggio, finestra `#sync`)
- `style.css` (finestra, pile di bottoni, messaggi)
- `app.js` (blocco sincronizzazione; `askConfirm` generica al posto di `askRemove`)
- `sw.js` (cache `pixellogo-v5`; ignora tutte le richieste a origini diverse dall'app, quindi mai `api.github.com`)
- Dati nuovi in `localStorage`: `pixellogo.token`, `pixellogo.gistId`, `pixellogo.sync`. Il formato di `pixellogo.preferiti` non cambia.

## Come funziona ora
- Gist: privato (`public: false`), descrizione «PixelLogo: preferiti», un solo file `pixellogo.json` con `{ version: 1, updatedAt, data: { favorites } }`. Se `gistId` manca si cerca il Gist per nome del file (fino a 10 pagine da 100), altrimenti si crea.
- Stato dell'ultimo scambio in `pixellogo.sync`: `remoteUpdatedAt` (data della versione remota), `syncedAt`, `syncedHash` (impronta dei preferiti). «Modifiche non inviate» = impronta attuale diversa da `syncedHash`, oppure mai sincronizzato con preferiti presenti.
- **Invia:** se non è cambiato niente né qui né sul Gist, dice «Niente da inviare». Se il Gist è cambiato altrove (o non è mai stato scaricato qui), chiede conferma prima di sovrascrivere. Poi PATCH o POST.
- **Scarica:** se nel Gist non c'è niente: «prima invia». Se i dati sono illeggibili o con `version` > 1, non tocca nulla e lo spiega. Se ci sono preferiti non inviati diversi da quelli del Gist, chiede conferma. Se non è cambiato niente, «Hai già tutto». Sostituisce la lista, aggiorna stato e miniature.
- Nessuna unione: chi scarica o invia sovrascrive, sempre con conferma quando si rischia di perdere qualcosa.
- Errori in italiano: 401 «Token non valido.», 404 «Gist non trovato.» (e scollega il Gist vecchio, ritrovabile per nome), altro «Errore GitHub NNN.», senza rete «Nessuna connessione.». Il token non compare mai in messaggi o log.
- File troncato: si legge `raw_url` senza mandare il token.
- Finestra: il cursore parte sul titolo (non sul campo del token) per non far scorrere il contenuto né aprire la tastiera. Se il browser non supporta `<dialog>`, l'ingranaggio non apre nulla (rischio noto, browser molto vecchi).

## Impatti e dipendenze
- Il token vive in `localStorage` dell'origine da cui si apre l'app: se un giorno l'app cambia indirizzo, va reinserito. Dove pubblicare resta da decidere.
- Un secondo dispositivo si collega da solo trovando il Gist per nome: basta inserire il token.
- Dopo un Scarica, `favorites` in memoria e miniature vengono aggiornate; le stelle seguono il seme corrente.
- `app.js` è a circa 570 righe: vicino alla soglia di ~600 del `CLAUDE.md`. Alla prossima modifica che lo allunga va proposta la divisione.

## Note mobile
- A 360px i bottoni della finestra sono uno sotto l'altro, tutti alti 44px; la finestra scorre se è più alta dello schermo (provato anche a 360x480).
- Non provato con GitHub vero (vedi resoconto): verificato con un finto GitHub nel browser di prova.
