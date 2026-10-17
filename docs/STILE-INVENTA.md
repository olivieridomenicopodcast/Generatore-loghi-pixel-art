# Stile Inventa

Lo stile della webapp **Inventa**: una raccolta di giochi e giocattoli procedurali (generati da un seme), presentata in un hub con una carta per ogni gioco. Dentro ci sono Mondi, Riff, Chimere, Sprite, Suoni, Città, Camion, Shred, Eco, AEGE, Atlante e Rimini 3 giorni. Slogan dell'hub: «Una fabbrica di cose procedurali». Si usa **solo se l'utente lo conferma** per quella webapp (vedi `CLAUDE.md`, sezione 5).

Fonte: `index.html`, `shared.css` e `fonts/` del repo `Inventa`. I valori sono copiati da lì, non stimati. `shared.css` è condiviso dall'hub e dai singoli giochi: ogni gioco può aggiungere regole proprie, che qui non sono state censite.

## L'idea
Scuro, notturno, con un accento **ciano luminoso**: vetro smerigliato, bordi sottili, bagliori. Bottoni a pillola, testi in maiuscolo con spaziatura larga.

## Colori (variabili in `:root`)
| Variabile | Valore | Uso |
|---|---|---|
| `--bg` | `#03040a` | sfondo |
| `--ink` | `#e9efff` | testo |
| `--dim` | `#8f9bbd` | testo secondario |
| `--ac` | `#35d0ff` | accento ciano |
| `--glass` | `rgba(14,18,36,.62)` | pannelli di vetro |
| `--line` | `rgba(255,255,255,.12)` | bordi |

## L'hub (pagina iniziale)
- **Cielo stellato** a tutto schermo (canvas) con **nebulose** di sfumature viola, rosso e azzurro dietro.
- **Logo gigante** «INVENTA» con sfumatura bianco-azzurro-viola ed effetto *glitch* rosa e ciano che compare ogni tanto.
- **Una carta per gioco** in griglia (minimo 310px): vetro sfocato, angoli 26px, bordo e bagliore nel **colore del gioco** (variabile `--c` diversa per ogni carta: azzurro, rosso, verde, viola, giallo, arancio, ecc.), inclinazione 3D che segue il tocco o il mouse, entrata dal basso una dopo l'altra. Dentro: icona 78px, titolo Unbounded, descrizione breve, etichetta in pillola e freccia «vai».
- **Carte «presto»** (`.soon`): più spente, senza interazione.
- Ogni gioco ha un **proprio colore d'accento** sopra la base scura comune: il ciano `#35d0ff` è quello di default, non l'unico.

## Font (inclusi nel repo, self-hosted)
- **Unbounded** (titoli, bottoni, marchio), pesi 300, 600, 900.
- **Space Grotesk** (testo), peso 300 + fallback di sistema.
- **Press Start 2P** (pixel, usato per sprite/giochi).
- Licenza in `fonts/LICENSE.txt`. I file `.woff2` si copiano dal repo `Inventa`, cartella `fonts/`.
- Nota: `index.html` di Inventa carica anche Google Fonts dal CDN; nelle nuove webapp usare solo i file locali.

## Componenti
- **Pillola** (`.pill`): fondo vetro con sfocatura, bordo sottile, angoli completamente tondi, testo 12px maiuscolo con spaziatura; al passaggio il bordo diventa ciano con bagliore e sale di 1px.
- **Bottone** (`.btn`): fondo ciano, testo scuro, Unbounded 12px maiuscolo con spaziatura larga, angoli tondi, ombra luminosa; alla pressione si rimpicciolisce (`scale(.97)`). Variante `.btn.ghost`: trasparente con bordo.
- **Marchio** (`.brand`): Unbounded 900, spaziatura molto larga, con un puntino ciano che pulsa.
- **Barra in alto** (`.top`): fissa, sfumata dal scuro al trasparente, rispetta le zone sicure del telefono (`env(safe-area-inset-top)`).
- **Notifica** (`#toast`): pillola scura con bordo ciano, scende dall'alto e svanisce.
- Interazioni lente e morbide (transizioni 0.25-0.45s).

## Tema chiaro
Inventa è solo scuro. Se la webapp deve avere l'interruttore chiaro/scuro (`CLAUDE.md`), il tema chiaro va proposto da zero e fatto approvare. Non decidere da soli.
