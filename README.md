# Hop.io

## T-Reds submission - Sorint Hackaton 2021

Group members:

-   Davide Campagnola
-   Lorenzo Romagnoni

## Project

Abbiamo iniziato con un brainstorming iniziale, durante il quale abbiamo analizzato le diverse propettive legate al tema proposto:

> Offrire una soluzione che permetta di migliorare l'esperienza di viaggio delle persone, risolvendo criticità nate a seguito della pandemia.

Nel tema completo, vengono citati non solo viaggiatori intesi come turisti, ma anche lavoratori e studenti, che sfruttano la mobilità urbana ( sia privata, che pubblica ) per recarsi alle proprie destinazioni ogni giorno.

## Focus

Appiamo deciso di concentrarsi sui problemi legati alla mobilità urbana.
In particolare, a seguito degli eventi di questi mesi, è nata la consapevolezza di situazioni che possono mettere a disagio diversi soggetti, come assembramenti nelle stazioni dei mezzi pubblici, ed il mancato rispetto delle normative di sicurezza su di essi.

E' stata ritrovata inoltre una volontà di prendersi una maggior cura di se stessi, dedicando una parte del proprio tempo a svaghi, hobby e attività ludiche.

## Output -> Hop.io

La piattaforma Hop.io, si propone come innovatrice dell'esperienza dei mezzi di trasporto condivisi.
Tramite questo servizio, i passeggeri possono iscriversi e prenotare le tratte di cui hanno bisogno, per effettuare i propri spostamenti all'interno di un ambiente sicuro e controllato, nel quale la sicurezza ed il benessere del cliente sono la priorità ed il valore che rappresenta la differenza tra i principali competitor.

L'idea è quella di poter offire una nuova possibilità a tutti colori che hanno la necessità di effettuare regolarmente tratte urbane, in modo che possano risolvere questo loro bisogno in totale sicurezza e comfort.

I mezzi di trasporto impiegati nel servizio garantiscono una capienza minima di 5 passeggeri, massima di 10 ( una soluzione intermedia fra un taxi ed un autobus ).
In questo modo, la sicurezza dei passeggeri può essere curata con maggior attenzione, la possibilità di poter definire la posizione di pickup e dropout in base alle preferenze dell'utente, permette di evitare i possibili assembramenti alle stazioni.

Anche dal punto di vista sociale, può permettere la creazione di nuovi legami. Essendo orientata per color che sfruttano regolarmente il servizio, ed essendo la capienza dei veicoli limitata, è più probabile che le persone si incontrino diverse volte e diventino "compagni di hop".

Dal punto di vista del pricing, il modello di business si basa su abbonamenti, in modo che venga incentivato l'utilizzo continuo nel tempo del servizio.

Un ulteriore vantaggio rispetto all'utilizzo di un abbonamento "classico" per i mezzi pubblici, è il fatto che il consumo di Hop.io, è valutato in base all'utilizzo ( ad esempio i km percorsi).
In questo modo, nell'eventualità in cui si rivelino necessarie misure restrittive che impediscano l'utilizzo della mobilità urbana, non si avrà nessuno spreco economico causato dal mancato utilizzo del servizio.

Inoltre, con la ripresa dell'attività produttiva, molti soggetti dorneranno ad occupare le strade. A seguito di quanto accaduto, molti preferiranno utilizzare un proprio veicolo, rispetto al trasporto pubblico. A seguito di queste conseguenze, è molto probabile che si verificheranno problemi dovuti all'eccessivo traffico automobilistico.

Hop.io è la soluzione anche a questo tipo di problema, infatti tramite algoritmi che possono calcolare il percorso più efficente per soddisfare le richieste di tutti i passeggeri, è possibile diminuire notevolmente il numero di veicoli in circolazione.

Legato a questo, l'implementazione di una soluzione di questo tipo, comporterebbe notevoli vantaggi anche dal punto di vista delle emissioni di CO2.

## Piattaforma Sviluppata

Abbiamo sviluppato un MVP di Hop.io, composto da un applicativo di backend che gestiscono lo storage dei dati e l'esposizione di REST API per la loro manipolazione, e di una web app che utilizza queste API.

### BACKEND

Le api sono state sviluppate utilizzando il framework Express, ed il linguaggio di programmazione Typescript.
Sono stati implmentati unit test, circa 110, per garantire il corretto funzionamento dell'applicativo.

### FRONTEND

La webapp è stata sviuppata utilizzando React, Typescript come linguaggio e Redux come soluzione di state management.

### PUNTI SALIENTI

Tramite il prodotto sviluppato, è possibile:

-   Iscriversi e loggarsi al servizio come passeggero
-   Iscriversi e loggarsi al servizio come autista
-   Creare un viaggio ( trip ) e visualizzare quelli upcoming [passeggero]
-   Dare una disponibilità ( shift ), visualizzare quelle date [autista]
-   Calcolare il percorso più efficente in base ai viaggi richiesti dagli utenti e la disponibilità dell'autista
-   Visualizzare il percorso che si dovrà effettuare durante un proprio shift, con orari, possibilità di chiamare i passeggeri, integrazione con google maps. [autista]

Abbiamo inoltre curato l'aspetto grafico del sito, rendendolo responsive, utilizzando principalmente Boostrap come framework di stile.

### ALGORITMO DI PATH OPTIMIZING

L'algoritmo può usufruire delle seguenti informazioni per elaborare il miglior percorso:
Trip degli utenti
Disponibilità dell'autista
Capacità del veicolo
Ogni trip è composto da:
Fascia oraria di partenza ( un utente può dire:"Sono disponibile per il pickup dalle 8:00 alle 8:15").
Arrivo entro (un utente può dire: "Voglio arrivare a destinazione entro le ore 10:00")

Si tratta di un problema NP completo. Per la sua soluzione abbiamo implementato euristiche che identificano la nostra soluzione come greedy.

In breve, prima di tutto prendiamo i trip che sono nella stessa fascia oraria della disponibilità fornita dall'autista.
In seguito partiamo con i più vicini ( in termini di durata del viaggio ), cercando di riempire il veicolo.
In caso sia presente un percorso che permette di portare a destinazione tutti i passeggeri, soddisfando le loro richieste, allora li portiamo tutti a destinazione.
Se non si può si prova a calcolarlo con un passeggero in meno in auto, e così via.
Una volta portati a destinazine ripetiamo fino a quando non ci sono pià utenti che è possibile soddisfare.

### REST API Esterne utilizzate

Per l'implementazione delle funzionalità presenti, sono state usate API esterne, in particolare:
Google Map API
RouteXL API

# Istruzioni per installazione e avvio:

### API

Clonare il repo

```sh
cd api
npm i
npm run build && npm run start
```

Per eseguire i test

```sh
cd api
npm t
```

### WebApp React

Clonare il repo

```sh
cd frontend
npm i
npm run start
```

## Ringraziamenti

Ci teniamo a ringraziare gli organizzatori dell'evento che ci hanno permesso di metterci alla prova e verificare quanto potessimo produrre in così poco tempo!
