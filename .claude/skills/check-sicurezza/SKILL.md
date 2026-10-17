---
name: check-sicurezza
description: Usa quando l'utente chiede «controlla la sicurezza della mia app», «posso pubblicarla?», «ci sono chiavi esposte?» o dopo le correzioni di un controllo precedente. Controllo di base, in sola lettura, per webapp statiche (HTML/JS, PWA) con dati in localStorage e Gist con token. Non usarla per app con database Supabase (vedi extra-supabase/) né come penetration test.
---

# Controllo di sicurezza di base (webapp statica con Gist)

Chi chiede il controllo spesso non è uno sviluppatore: spiega ogni problema in parole semplici e per ognuno scrivi la frase da dare a Claude Code per correggerlo. Non è un penetration test e non sostituisce uno sviluppatore: dillo nel rapporto.

## Regole che non si discutono
1. **Solo lettura.** Non modificare file, non fare commit, non cambiare impostazioni. Descrivi i problemi, non correggerli.
2. **Mai segreti in chiaro.** Se trovi un token, scrivi dove sta e i primi 6 caratteri seguiti da `…`. Mai il token intero, nemmeno nel terminale.
3. **Mai dati di persone** nel rapporto: solo dove sono e quanti.
4. **Non inventare.** Se un controllo non si può fare, scrivilo in «Cosa non ho controllato».

## Il metodo
1. **Parti dalla versione giusta**: `git status`, `git fetch`, confronta col ramo principale. Annota il commit (`git rev-parse --short HEAD`). Se sei indietro, dillo.
2. **Due passate**: prima raccogli i sospetti, poi li riprendi uno a uno come un revisore che non si fida: rileggi il codice, cerca se il problema è già protetto altrove. Solo dopo lo metti nel rapporto, come **verificato** o **da confermare**.
3. **Un giro non basta**: se esiste un `report-sicurezza-*.md` precedente, leggilo: ogni problema diventa **risolto**, **ancora aperto** o **nuovo**. «L'AI dice che è sistemato» non vale: si riverifica.

## I controlli

### 1 · Segreti nel posto sbagliato
Cerca in tutti i file e nella cronologia recente (`git log -p -S "ghp_"`):
- token GitHub (`ghp_`, `github_pat_`, `gho_`), chiavi `sk_live_`/`sk_test_`, `-----BEGIN`, `Bearer ` seguito da un valore scritto nel codice;
- file `.env` tracciati (`git ls-files | grep -i env`);
- un token scritto nel codice, in un commit o in un esempio → **indispensabile** (e va revocato, non basta toglierlo).

### 2 · Il token del Gist
- Vive solo in `localStorage`, mai nel codice o nei log? Campo `password`? Esiste «Rimuovi token»?
- Il token richiesto è `classic` con solo `gist`? Se la guida dell'app suggerisce permessi più ampi (`repo`) → **indispensabile**.
- Il Gist è creato con `public: false`? Se è `true` → **indispensabile** se contiene dati personali, altrimenti miglioria.
- Messaggi di errore e `console.log` non mostrano mai il token.

### 3 · Testo dell'utente nell'HTML (XSS)
- Cerca `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`.
- Se un valore scritto dall'utente (o letto dal Gist, che è "esterno") finisce dentro senza escape → **indispensabile**. Con `textContent` o una funzione `esc()` → ok.
- I dati letti dal Gist vanno trattati come non fidati: se qualcuno modifica il Gist, non deve poter eseguire codice nell'app.

### 4 · Script e risorse esterne
- Script, font o CSS da CDN: versione fissata? Dominio affidabile? Senza versione → miglioria; da un dominio sconosciuto → **indispensabile**.
- Quando possibile, suggerisci Subresource Integrity (`integrity`) o di portare il file in locale.

### 5 · Service worker
- Mette in cache solo la stessa origine? Non salva risposte di `api.github.com` (conterrebbero i dati del Gist)? Versione della cache aggiornata?
- Se mette in cache risposte con dati personali → miglioria.

### 6 · Pubblicazione
- Se il repo è pubblico: controlla che non ci sia nulla che non dovrebbe esserlo (dati veri, file di backup, note personali).
- Il sito è servito in HTTPS? Ha `manifest.json` corretto?

### 7 · Dipendenze
- Se c'è `package.json`: `npm audit --omit=dev`, riporta solo `high` e `critical` con la versione che li risolve. Non lanciare `npm audit fix`.

## Il rapporto
Scrivilo in `report-sicurezza-AAAA-MM-GG.md` nella cartella di lavoro e **non committarlo** (può dire dove sono i punti deboli; se il repo è pubblico è ancora più importante). Riassumilo in chat. Forma:

```markdown
# Controllo di sicurezza di base · [nome app] · [data] · giro [N]
- Codice controllato: commit [abc1234]
- Stack: [HTML/JS, PWA, sync Gist]

## Rispetto al giro precedente (dal giro 2)
- Risolti: [...] · Ancora aperti: [...] · Nuovi: [...]

## Indispensabile (prima di pubblicare)
1. **[Il problema in una riga]** · [verificato / da confermare]
   - Dove: [file:riga]
   - Perché conta: [cosa può succedere, in parole semplici]
   - Come l'ho verificato: [...]
   - Cosa dire a Claude Code: «[...]»

## Miglioria (quando c'è tempo)
1. ...

## Falsi allarmi scartati
- [sospetto] → [perché non è un problema]

## Cosa non ho controllato
- [...]

## Prossimo passo
Correggi gli indispensabili, poi rifai il controllo, finché un giro torna pulito.
Questo è un controllo di base, non un penetration test.
```

Regole: **Indispensabile** = espone dati o token, permette di eseguire codice altrui, blocca la pubblicazione. **Miglioria** = tutto il resto; nel dubbio, miglioria. Un problema è **risolto** solo se lo hai riverificato in questo giro. Mai istruzioni su come sfruttare un problema: solo dove sta e come si chiude.
