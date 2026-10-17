---
name: permessi-database
description: Usa quando una modifica crea o cambia tabelle, colonne, viste, funzioni SQL, policy RLS o edge function su Supabase. Serve a non aprire dati per errore e a non svuotare pagine per un permesso mancante. Non usarla per modifiche solo grafiche o di testo.
---

# Permessi del database (Supabase)

Su Supabase la sicurezza ha due strati: le policy RLS e i GRANT. Servono tutti e due.

## Prima di scrivere la migrazione
- Leggi lo stato reale dei permessi sul database, non dedurlo dalle migrazioni vecchie.
- Migrazioni solo additive. DROP, DELETE di massa, cambi di tipo e `ALTER TYPE ... ADD VALUE` (irreversibile): fermati, proponi un piano e mostra l'SQL prima di applicarlo.

## Tabelle nuove
- RLS attiva, con policy esplicite per ogni operazione che serve. Mai una policy aperta a tutti gli autenticati su dati personali.
- Concedi solo i GRANT necessari, ai ruoli che servono.

## Colonne nuove
- Se la tabella ha permessi per colonna, la colonna nuova va concessa esplicitamente ad `authenticated`, altrimenti la select fallisce.
- Una `REVOKE` su una colonna non ha effetto se il ruolo ha il SELECT sull'intera tabella.
- Dati personali: mai un SELECT sull'intera tabella; le colonne private si leggono con funzioni dedicate.

## Funzioni nuove (RPC)
- Nascono eseguibili da tutti. `REVOKE ALL ON FUNCTION ... FROM PUBLIC`, poi `GRANT EXECUTE` solo ai ruoli che servono.
- Revocare solo ad `anon` non basta: eredita da `PUBLIC`.
- `SECURITY DEFINER` solo se serve, con `SET search_path` fissato e con il controllo di chi chiama dentro la funzione.

## Edge function
- Con `verify_jwt = false` la funzione deve controllare nel codice chi la chiama.
- Mai chiavi segrete nel codice del browser: solo nei secret delle funzioni.

## Verifica, sempre sul database vivo
- `has_table_privilege`, `has_column_privilege`, `has_function_privilege` per `anon` e `authenticated`; `pg_policies` per le policy.
- Riporta i risultati nel resoconto finale.
