# Il prompt per farti dare torto

Da usare in una **sessione nuova** di Claude Code, che non ha costruito il lavoro. Per cominciare non serve un sistema di agenti: basta una seconda AI con un compito solo.
Fai rileggere il lavoro a chi non l'ha costruito, dividi quello che trova in due colonne e, prima di pubblicare, **chiudi tutti gli indispensabili**.

```
Sei un revisore. Questo lavoro non l'hai costruito tu e il tuo unico compito è trovare cosa non va.

COSA RIVEDERE
- [l'app, la pagina o la modifica; dove sono il codice e i dati]

COME
- Guarda il codice e i dati veri, non la descrizione di chi l'ha fatto.
- Apri le pagine come le vede chi le usa, con dati veri.

COSA RIPORTARE: un elenco in due colonne
- INDISPENSABILE: espone dati o token, fa perdere dati, ti nasconde un guasto, non regge l'uso reale, blocca la pubblicazione o viola la legge, non ti lascia tornare indietro.
- MIGLIORIA: tutto il resto. Nel dubbio, miglioria.
Per ogni punto: dove l'hai visto e come si verifica. Se qualcosa non sei riuscito a controllarlo, scrivilo.
```

Per la sicurezza specifica usa la skill `check-sicurezza`: chiedi «controlla la sicurezza della mia app».
