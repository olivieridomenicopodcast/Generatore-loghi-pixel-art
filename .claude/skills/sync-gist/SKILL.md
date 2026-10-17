---
name: sync-gist
description: Usa quando una webapp deve salvare o sincronizzare i dati su un GitHub Gist con token (pull/push manuali), o quando si modifica quel codice. Serve a farlo sempre allo stesso modo e sicuro. Non usarla per webapp con database o login.
---

# Sincronizzazione dei dati con un GitHub Gist

Il modello standard: i dati stanno in `localStorage` sul dispositivo; con **Pull** si scaricano dal Gist, con **Push** si caricano. Niente sincronizzazione automatica: l'utente decide.

## Il token
- Serve un **token classic** con il solo permesso `gist`. I token «fine-grained» non supportano i Gist.
- Si inserisce dalle impostazioni dell'app (icona SVG, niente emoji) e vive solo in `localStorage`. Mai nel codice, mai in un commit, mai in un log o in un messaggio di errore.
- Il campo del token è di tipo `password`. Aggiungi un pulsante «Rimuovi token».
- Spiega all'utente: se il token trapela, si revoca da GitHub › Settings › Developer settings.

## Il Gist
- Creato con `public: false`. Attenzione, da spiegare all'utente: un Gist «segreto» non è elencato ma **chi ha il link lo legge**. Niente dati sensibili.
- Un solo file per app, con nome fisso (es. `nome-app.json`), che contiene: `{ "version": 1, "updatedAt": "ISO-8601", "data": { ... } }`.
- Salva `gistId` in `localStorage` dopo il primo Push. Se manca, cerca il Gist per nome del file; se non c'è, il Push lo crea.

## Il comportamento
1. **Pull**: se ci sono modifiche locali non inviate e il Gist è più recente, **chiedi conferma** prima di sovrascrivere.
2. **Push**: se il Gist è stato modificato dopo l'ultimo Pull, **avvisa** e chiedi conferma prima di sovrascrivere.
3. File troppo grandi: se `files[nome].truncated` è vero, leggi `raw_url`.
4. Errori in italiano e in chiaro: 401 «Token non valido», 404 «Gist non trovato», altro «Errore GitHub NNN». Mai mostrare il token.
5. Mostra lo stato («Sincronizzato alle 14:32», «Modifiche non inviate»).
6. Usa `version` per i cambi di formato: una migrazione dei dati vecchi, senza perdere nulla.

## Il service worker
- Mette in cache solo i file dell'app (stessa origine). **Mai** le richieste a `api.github.com`.

## Cosa riportare alla fine
- Cosa succede in Pull e in Push con dati locali nuovi, dati remoti nuovi, e token mancante: verificato, non descritto.
