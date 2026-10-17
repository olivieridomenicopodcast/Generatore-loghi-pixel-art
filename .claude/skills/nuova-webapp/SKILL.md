---
name: nuova-webapp
description: Usa quando si parte da questo modello per una webapp nuova e il `CLAUDE.md` ha ancora le parti tra parentesi quadre da compilare. Serve a farsi dire le 5 cose che servono prima del primo prompt e a impostare il progetto. Non usarla per modificare una webapp già impostata.
---

# Impostare una webapp nuova

Prima di scrivere codice, il progetto deve avere le sue istruzioni. Mezz'ora ora, meno errori dopo.

## 1. Fai le domande, una alla volta
Chiedi (in italiano, in parole semplici) e fermati ad aspettare le risposte:
1. **Cos'è**: cosa fa, per chi, dove la userà (telefono, PC, installata come app).
2. **Dati**: cosa salva e dove. Default: `localStorage` + Gist privato. Se serve login, più utenti o un database, dillo subito: esce dal default.
3. **Design**: chiedi sempre, senza dare nulla per scontato, quale dei quattro stili usare:
   - Olivieri Domenico (`docs/STILE-OLIVIERI.md`);
   - Inventa (`docs/STILE-INVENTA.md`);
   - Tavolo da gioco (`docs/STILE-TAVOLO-DA-GIOCO.md`), chiedendo anche quale variante di feltro o legno;
   - uno da zero: proponi palette e font in poche righe e aspetta l'ok.
   Leggi il file dello stile scelto prima di scrivere il codice.
4. **Decisioni già prese**: cose che non vanno rimesse in discussione.
5. **Fuori dal perimetro**: cosa la webapp NON fa.

## 2. Compila `CLAUDE.md`
- Sostituisci ogni parte tra parentesi quadre con le risposte. Togli la nota iniziale sul modello.
- Cambia il titolo con il nome della webapp.
- Non aggiungere sezioni nuove senza dirlo.

## 3. Prepara la struttura minima
- `index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`, icone.
- `roadmap.md` con le funzioni previste come elenco da spuntare.
- La cartella `sprint/` resta com'è.

## 4. Proponi la prima modifica
Non costruire tutto subito: proponi la **prima modifica più piccola che si possa usare**, scritta con `docs/PROMPT-4-PARTI.md`, e aspetta l'ok.

## Vincoli
- Non inventare risposte al posto dell'utente.
- Non aggiungere funzioni non chieste.

## Cosa riportare alla fine
- Il `CLAUDE.md` compilato (riassunto in 5 righe) e la prima modifica proposta.
