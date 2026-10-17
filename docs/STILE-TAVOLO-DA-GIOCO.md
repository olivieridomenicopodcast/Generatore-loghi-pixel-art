# Stile «Tavolo da gioco»

Lo stile dei giochi da tavolo digitalizzati per i playtest: **Fifo Fafo playtest**, **Cromozapd**, **Domani Piove**. Si usa **solo se l'utente lo conferma** per quella webapp (vedi `CLAUDE.md`, sezione 5).

Fonte: i CSS dei tre repo (`Fifo-Fafo-playtest-`, `Cromozapd-`, `Domani-Piove`, file `css/style.css`). I valori qui sotto sono copiati da lì, non stimati.

## L'idea
Un tavolo da gioco: fondo di **feltro o legno**, sopra **pannelli color carta**, testi e bottoni **grandi** da usare al volo anche da telefono. Cambia il colore del feltro da gioco a gioco, il resto è comune.

## Regole comuni ai tre
- Testo base **17px** (`html { font-size: 17px }`), interlinea 1.4-1.45, bersagli tocco di almeno 44px (`min-height: 44px` sui bottoni).
- **Fondo** scuro di feltro o legno; **contenuti** su pannelli color carta (`#f6ecd2`-`#f8eed7`), testo scuro marrone (`#2a2113`-`#3b2410`).
- **Pannelli** (`.card`): bordo 2-3px marrone, angoli arrotondati (14-16px), ombra morbida. Su Fifo Fafo anche un secondo bordo tratteggiato interno, effetto carta.
- **Bottoni** (`.btn`): fondo carta, bordo marrone 2px, angoli 10-12px, testo in grassetto, ombra sotto che sparisce quando si preme (effetto «tasto fisico», `translateY` al tocco). Il bottone principale (`.btn.primary`) usa il colore accento.
- **Barra in alto** (`.topbar`): scura, con bordo inferiore marrone di 3-4px, fissa in alto.
- **Colori di stato**: verde per ok, rosso per errore/pericolo, ambra per avviso.
- **Giocatori** con colori fissi (`--p0`, `--p1`, `--p2`).
- Struttura: una pagina, schermate che si alternano (`.screen.active`), PWA offline con `manifest.json` e `sw.js`.

## Le tre varianti

| | Fifo Fafo | Cromozapd | Domani Piove |
|---|---|---|---|
| Fondo | legno `#4a2e1a` (con venature) | feltro verde `#1d6b47` / `#14402c`, pagina `#0f2f21` | feltro blu-verde `#1d3b4d` / `#254b60` |
| Carta | `#f8eed7`, `#efdcb4` | `#f6ecd2`, `#efe1bd` | `#f6efdd`, `#ece3cb` |
| Testo | `#3b2410` | `#2b1d0e` | `#2a2113` |
| Accento | arancio `#c4691f`, `#a8480f` | oro `#f2c14e`, arancio `#e8833a` | rosso mattone `#b5481b`, azzurro `#2c7fb8` |
| Giocatori | `#f08a2b`, `#3f86d0` | `#e8833a`, `#2aa7a0`, `#8a5fd1` | non definiti |
| Stato | ok `#2f8a4a`, errore `#c0392b` | ok `#1f8a4c`, errore `#c0392b` | ok `#256a43`, errore `#b4261a`, avviso `#b8741a` |
| Font | Fredoka (titoli) + Nunito (testo) | Trebuchet MS / sistema | sistema (`system-ui`) |
| Angoli | 16px | 14px | 10px |

## Font
- Fifo Fafo carica Fredoka e Nunito da Google Fonts (CDN). Nelle nuove webapp vanno **inclusi nei file** (self-hosted, licenza OFL), come da `CLAUDE.md`.
- Cromozapd e Domani Piove usano font di sistema, quindi non serve includere nulla.

## Tema chiaro e scuro
Il fondo è sempre scuro (feltro/legno) e le carte sempre chiare: non esistono due temi. Se la webapp deve avere l'interruttore chiaro/scuro (`CLAUDE.md`), va deciso con l'utente come si traduce: per esempio fondo chiaro di carta nel tema chiaro. Non decidere da soli.

## Le emoji fanno parte dello stile
In questo stile le **emoji si usano**, come nei tre giochi (eccezione voluta alla regola «niente emoji» del `CLAUDE.md`, che vale per gli altri stili). Dove compaiono nei repo (lette dal codice di `index.html`, `js/data.js`, `js/engine.js`):
- **Stati e umori dei personaggi** (Fifo Fafo: 😤 😡 🤗 😐 😈).
- **Effetti ed eventi di gioco** (⚡ 🔥 💥 ⚠ 🚫 🔮 🎯).
- **Oggetti e luoghi del tema** (🛏 🐱 🪣 🍽 🍬 in Fifo Fafo; 👷 📻 💰 🛒 in Domani Piove).
- **Pulsanti delle modalità di gioco e strumenti** (🤖 👥 🍿 📡 📊 🔄 ⏭ 📖).
- **Registro delle mosse e regolamento** (📜 📖 🔎).
Le emoji si usano insieme alle etichette in testo, non al posto loro, quando serve chiarezza. Usarne di nuove nello stesso modo: una per concetto, sempre la stessa.
