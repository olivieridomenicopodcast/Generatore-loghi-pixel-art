# V1 — Generare un logo 32x32 da un seme

## Scope
Mostrare un logo pixel art 32x32 generato da un seme, con campo «Seme» e bottone «Genera». Niente nomi, preferiti o Gist.

## Cosa cambia
- La pagina mostra un logo ingrandito senza sfumature, un campo «Seme» e il bottone «Genera».
- Scrivendo nel campo il logo si ridisegna subito. Lo stesso seme dà sempre lo stesso logo.
- «Genera» scrive nel campo un seme casuale e disegna il logo. All'apertura parte già con un seme casuale.
- Sostituita la frase provvisoria «per ora c'è solo l'impalcatura».

## File toccati
- `index.html` (canvas, campo seme, bottone, frase di aiuto)
- `style.css` (canvas, campo, bottone in stile Inventa)
- `app.js` (generatore e disegno)
- `sw.js` (cache `pixellogo-v2`)
- Nessun dato salvato.

## Come funziona ora
- Il testo del seme diventa un numero (hash FNV-1a) che alimenta un generatore pseudocasuale (mulberry32): stesso testo, stessa sequenza.
- Dalla sequenza escono: tinta e colore d'accento, una delle 4 sagome (cerchio, quadrato smussato, rombo, scudo), il bordo più chiaro e un emblema simmetrico 8x8 celle da 2 pixel, specchiato.
- Le funzioni `logoPixels(seed)` e `drawLogo(seed)` sono in `app.js`; il canvas è 32x32 e viene ingrandito dal CSS (`image-rendering: pixelated`).
- Seme vuoto: disegna comunque un logo (quello del testo vuoto).

## Impatti e dipendenze
- Chi cambia l'algoritmo cambia anche i loghi dei semi già usati: i preferiti futuri dovranno salvare il seme, e un logo salvato potrebbe cambiare aspetto se l'algoritmo viene modificato. Da tenere presente quando si faranno i preferiti.
- Il nome (voce successiva della roadmap) dovrà usare un generatore derivato dallo stesso seme.

## Note mobile
- A 360px il logo occupa quasi tutta la larghezza, campo e bottone alti 44px, nessuno scroll orizzontale.
- Su schermo largo il logo è a sinistra, allineato al resto, largo al massimo 384px.
