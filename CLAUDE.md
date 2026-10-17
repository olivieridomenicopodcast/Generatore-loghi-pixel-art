# PixelLogo: istruzioni permanenti

> Il repo può essere pubblico: qui dentro non scrivere mai token, chiavi o dati di persone.

## 1. Cos'è
PixelLogo genera in modo procedurale loghi in pixel art, con nomi casuali ma sensati. La usa solo Niky, da PC e da telefono, come PWA installata. Le modifiche le decide e le rivede Niky.

## 2. Utenti e dati
La usa solo Niky, nessun login. Si salvano i loghi preferiti in `localStorage` sul dispositivo, sincronizzati su un GitHub Gist privato con pull/push manuali (skill `sync-gist`).

## 3. Come lavoriamo
- Chi scrive le richieste non è uno sviluppatore di mestiere: spiega le scelte tecniche in parole semplici e segnala i rischi prima di agire, non dopo.
- **Chiedi prima.** Se per fare una cosa devi scegliere tu, o non sei sicuro, chiedi prima di agire.
- **Non decidere di tua iniziativa.** Una modifica per richiesta. Non toccare, aggiungere, togliere o «migliorare» quello che non è stato chiesto. Se ti sembra che qualcosa vada lasciato fuori o cambiato, proponilo e aspetta la risposta: non farlo da solo.
- **Copiare significa copiare.** Se ti viene chiesto di clonare o portare qualcosa da un progetto a un altro, riporta tutto per filo e per segno, cambiando solo quello che è stato indicato (nomi, riferimenti). Se pensi che qualcosa non vada portato, chiedi prima.
- **Niente supposizioni spacciate per fatti.** Prima di affermare qualcosa, cerca una fonte o una conferma (il codice, i file, la documentazione, il sito). Se non la trovi, dillo chiaramente: «non l'ho verificato, è una mia supposizione».
- Se la richiesta è ambigua, chiedi. Se la cosa esiste già, dillo invece di rifarla.
- Prima di cambiare il formato dei dati salvati o la sincronizzazione: proponi un piano e aspetta l'ok. Niente codice prima.
- Spiegazioni di livello medio: cosa hai fatto e perché in poche righe, senza tutto il dettaglio tecnico, ma senza nascondere le scelte.
- A fine lavoro usa la skill `chiudere-una-modifica`.
- Non dichiarare risolto ciò che non hai verificato. Se non puoi verificare, dillo.
- **Commit e push li fai tu**, a fine di ogni modifica: un commit per modifica, con un messaggio chiaro in italiano, sul ramo di lavoro indicato dalla sessione. Mai riscrivere la cronologia (niente force push, rebase o amend su commit già inviati): ogni modifica deve potersi annullare con `git revert`.
- Non creare pull request e non pubblicare il sito se non è richiesto esplicitamente.

## 4. Stack di default
- HTML + CSS + JavaScript puro, senza build, senza framework, salvo diversa indicazione in questo file.
- **Sempre PWA**, installabile su telefono e PC: `manifest.json` + `sw.js` + icone. A ogni modifica ai file in cache, aumenta la versione della cache in `sw.js`.
- Si usa soprattutto da telefono, ma deve funzionare bene anche da PC: progetta per il telefono e controlla anche lo schermo largo.
- Pubblicazione: non è deciso dove. Non scegliere un servizio da solo: chiedi quando serve. Alcune app potrebbero essere fatte per altre persone.
- Un solo `index.html`, un `style.css`, un `app.js`. Se `app.js` supera ~600 righe, proponi di dividerlo.
- Sincronizzazione con Gist: segui la skill `sync-gist`.

## 5. Lingua, tono e design
- Interfaccia in italiano, dando del tu, maiuscola solo a inizio frase.
- Tono dei testi: **amichevole e ironico**, con qualche freddura quando ci sta, ma mai a scapito della chiarezza di un'etichetta o di un errore.
- **Niente emoji** nell'interfaccia: per le icone usa SVG. **Eccezione:** lo stile «Tavolo da gioco» le comprende (vedi `docs/STILE-TAVOLO-DA-GIOCO.md`).
- Codice, nomi di file e variabili in inglese.
- Mobile prima di tutto (controlla a 360px), poi anche schermo largo da PC. Una sola azione principale per schermata.
- **Tema chiaro di default, tema scuro disponibile**, con un interruttore visibile (salvo che lo stile scelto, qui sotto, dica altro e l'utente confermi). La scelta si salva in `localStorage`. Alla prima apertura vale il chiaro, non la preferenza del sistema.
- Contrasto almeno AA in entrambi i temi (controllalo, soprattutto il viola scuro `#32187b` sul tema scuro), bersagli tocco di almeno 44px.

### Stile grafico: chiedi sempre
**A ogni webapp nuova, prima di scrivere codice, chiedi all'utente quale stile usare.** Non dare per scontato nessuno. Le scelte sono quattro:
1. **Stile Olivieri Domenico**, quello del sito e del portfolio (`docs/STILE-OLIVIERI.md`): viola scuro `#32187b` e arancione `#ff893a`, font Libre Baskerville per i titoli. Nel tema scuro l'accento è l'arancione.
2. **Stile Inventa** (`docs/STILE-INVENTA.md`): quello della raccolta di giochi procedurali Inventa. Scuro notturno con accento ciano `#35d0ff` (e un colore per ogni gioco), vetro e bagliori, font Unbounded + Space Grotesk.
3. **Stile «Tavolo da gioco»** (`docs/STILE-TAVOLO-DA-GIOCO.md`): quello dei giochi da tavolo per i playtest (Fifo Fafo, Cromozapd, Domani Piove): feltro o legno, pannelli color carta, testi grandi, bottoni «tasto fisico», **con le emoji**. È quello che piace di più all'utente. Chiedi anche quale variante di feltro (legno, verde, blu-verde) o proponi un colore nuovo.
4. **Uno stile da zero** per quella webapp: proponi palette e font in poche righe e aspetta l'ok.

Per i primi tre, i dettagli e i valori sono nei file indicati: leggili prima di scrivere il codice. Se uno stile prevede un solo tema (scuro o chiaro) e la webapp deve averne due, decidi con l'utente come tradurlo.
- Qualunque stile: colori e font come variabili CSS in `:root`, mai valori sparsi nel codice. Font inclusi nei file dell'app (self-hosted, licenza OFL), non da CDN, così la PWA funziona offline.
- I valori marcati «stimato» in `docs/STILE-OLIVIERI.md` non sono verificati: non presentarli come certi.
- Se un colore non passa il contrasto AA su un fondo, non cambiarlo di nascosto: proponi l'alternativa.

## 6. Sicurezza: regole non negoziabili
- Il repo può essere pubblico: mai token, chiavi o password nel codice, nei commit, negli esempi o nei log.
- Il token GitHub dell'utente vive solo in `localStorage` del suo dispositivo, inserito a mano dalle impostazioni dell'app.
- Il testo scritto dall'utente non entra mai in `innerHTML` senza escape: usa `textContent` o la funzione `esc()`.
- Nessuno script esterno caricato da CDN senza versione fissata.
- Mai cancellazioni di massa dei dati dell'utente senza conferma esplicita nell'interfaccia.

## Autore
Dev by Domenico "Niky" Olivieri in Vibe Coding.

## 7. Decisioni già prese: non rimetterle in discussione
- Nessun login.
- Il seme decide tutto: stesso seme, stesso logo (e stesso nome).
- I loghi sono quadrati, 32x32 pixel.
- Stile grafico: **Inventa** (`docs/STILE-INVENTA.md`). Solo tema scuro, senza interruttore chiaro/scuro: deroga alla regola della sezione 5, confermata da Niky.
- Font da file locali copiati dal repo `Inventa` (cartella `fonts/`), mai da CDN.

## 8. Fuori dal perimetro
Nessun limite stabilito per ora. Se ne emergono, si scrivono qui.
