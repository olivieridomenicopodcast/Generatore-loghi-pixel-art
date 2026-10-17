# V2 — Nome casuale ma sensato per ogni logo

## Scope
Dare a ogni logo un nome «Sostantivo Aggettivo» in italiano, ricavato dallo stesso seme, senza cambiare il disegno dei loghi.

## Cosa cambia
- Sotto il logo compare il nome (per esempio «Volpe Curiosa», «Tostapane Spaziale»).
- Il nome si aggiorna insieme al logo, sia scrivendo il seme sia con «Genera».
- Stesso seme, sempre lo stesso nome.

## File toccati
- `index.html` (riga `#name` sotto il canvas)
- `style.css` (stile del nome: font titoli, `clamp(16px, 4.8vw, 24px)`; margini del logo)
- `app.js` (liste `NOUNS` e `ADJECTIVES`, funzione `logoName`)
- `sw.js` (cache `pixellogo-v3`)
- Nessun dato salvato.

## Come funziona ora
- `logoName(seed)` usa un generatore separato, `makeRng(seed + '|nome')`: il logo continua a usare `makeRng(seed)` e quindi non cambia.
- 30 sostantivi, ciascuno con genere (m/f), e 30 aggettivi con forma maschile e femminile (alcuni uguali nelle due forme, come «Veloce»). L'aggettivo segue il genere del sostantivo: «Luna Storta», «Gufo Storto».
- Combinazioni possibili: 30 x 30 = 900 nomi, quindi semi diversi possono dare lo stesso nome. Il seme resta l'identificativo vero.
- Il nome più lungo possibile è «Tostapane Imprevedibile».

## Impatti e dipendenze
- Se si cambiano o si riordinano le liste, i nomi dei semi già usati cambiano. Per i preferiti: salvare il seme e non il nome, oppure salvare anche il nome se si vuole che resti fisso. Da decidere quando si faranno i preferiti.
- Aggiungere parole in fondo alle liste cambia comunque i nomi di molti semi (la lunghezza della lista entra nel calcolo).

## Note mobile
- A 360px il nome più lungo sta su una riga (17px) e non c'è scroll orizzontale. Su schermo largo 24px.
