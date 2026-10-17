---
name: chiudere-una-modifica
description: Usa quando hai finito di applicare una modifica richiesta in una webapp e stai per dire che è fatta. Serve a verificare davvero, lasciare la scheda in sprint/, spuntare roadmap.md e fare il resoconto. Non usarla per domande, analisi o piani senza modifiche al codice.
---

# Chiudere una modifica

Una modifica non è finita quando il codice è scritto: è finita quando chi arriva dopo può capire cosa è cambiato, e quando hai verificato che funziona.

## 1. Verifica prima di dire «fatto»
- Rileggi la richiesta: i passi e i VINCOLI. Controlla di non aver toccato niente che la richiesta non nomina.
- Se la richiesta ha una sezione VERIFICA, eseguila punto per punto e riporta il risultato vero (valori salvati, markup, comportamento), non cosa dovrebbe succedere.
- Se hai toccato `index.html`, `style.css`, `app.js` o le icone: aumenta la versione della cache in `sw.js`, altrimenti l'app installata continua a mostrare la vecchia versione.
- Se hai toccato i dati salvati o il Gist: verifica che i dati già esistenti si leggano ancora (compatibilità all'indietro).
- Controlla la schermata a 360px e su schermo largo, in tema chiaro (default) e scuro.
- Se la richiesta era copiare o portare qualcosa, confronta con l'originale e riporta **ogni** differenza, anche voluta. Non lasciare fuori niente senza averlo chiesto.
- Controlla che nel codice non sia finito nessun token o chiave (`git diff` + cerca `ghp_`, `github_pat_`, `Bearer `).
- Se qualcosa non riesci a verificarlo, scrivilo. Non dichiarare risolto ciò che non hai verificato.

## 2. La scheda in sprint/
Crea o aggiorna la scheda seguendo `sprint/README.md`:
- nome del file: la sigla della richiesta se c'è (`V1-orari-ristorante.md`), altrimenti il numero progressivo (`003-descrizione.md`);
- struttura: Scope → Cosa cambia → File toccati → Come funziona ora → Impatti e dipendenze → Note mobile;
- scrivi come funziona adesso, non la cronaca di come ci sei arrivato;
- se la modifica cambia un comportamento descritto in una scheda vecchia, aggiungi in fondo a quella scheda un paragrafo «Aggiornamento AAAA-MM-GG» con il rimando alla nuova.

## 3. roadmap.md
Spunta la voce corrispondente, o aggiungila già spuntata se non c'era.

## 4. Il resoconto finale
Chiudi sempre con queste quattro righe, brevi:
- **Cosa è cambiato**, in parole semplici;
- **File toccati**, versione della cache compresa;
- **Come si verifica**, con i risultati dei controlli del punto 1;
- **Cosa resta aperto** o da decidere, se c'è.

## Vincoli
- Commit e push li fai tu, **dopo** la verifica e la scheda: un commit per modifica, messaggio chiaro in italiano, sul ramo di lavoro indicato dalla sessione. Mai riscrivere la cronologia: ogni modifica deve potersi annullare con `git revert`. Nel resoconto scrivi l'hash del commit.
- Non allungare il lavoro con migliorie non chieste: se ne vedi, elencale in «Cosa resta aperto».
