# Il prompt in 4 parti

Per ogni modifica non banale. Si scrive con te (o con Claude) e si dà a Claude Code. Il «perché» non c'è: serve a te, allunga solo il prompt.
Copia, togli le parentesi quadre e scrivi le cose del tuo progetto.

```
[SIGLA] — [titolo breve della modifica]

COSA MODIFICARE
- [file o pagina da toccare]
- [formato dei dati o impostazione, se serve]
NOTA: parti da quello che c'è ora nel progetto e non togliere nulla che questo prompt non nomina.

COSA FARE
1. [primo passo, con i testi esatti tra virgolette]
2. [secondo passo]

VINCOLI
- [cosa non deve toccare]

VERIFICA (riporta i risultati)
- [cosa controllare e cosa riportarti: valori salvati, com'è la pagina a 360px]
```

## Esempio (inventato, per capire il tono)

```
V1 — Calendario: voce «Consegna» con data e colore

COSA MODIFICARE
- app.js (form di inserimento e lista)
- style.css (colore della voce)
NOTA: parti da quello che c'è ora nel progetto e non togliere nulla che questo prompt non nomina. Tema chiaro e scuro, 360px.

COSA FARE
1. Nel form aggiungi il campo «Consegna» (data) e un selettore colore con 4 colori.
2. Nella lista mostra la consegna come «Consegna: 24/10», con il colore scelto.

VINCOLI
- Nessuna modifica alla sincronizzazione col Gist né al formato dei dati già salvati: i campi nuovi sono facoltativi.

VERIFICA (riporta i risultati)
- Cosa viene salvato in localStorage per una voce nuova e per una vecchia.
- Com'è la lista a 360px, tema chiaro e scuro.
```
