# SuperHero API

REST API der henter helte fra et eksternt API og lader brugeren gemme favoritter med en note. Lavet af Nicki i Programmering 3. semester, med review af Goncalo og Mattias.

## Kom i gang

1. Kræver Node og npm.
2. Installer og start:

```
npm install
npm start
```

Serveren kører på http://localhost:3000. Der må kun køre én server ad gangen på port 3000.

## Endpoints

1. `GET /superheroes` henter alle helte (200, 502 hvis det eksterne API fejler)
2. `GET /superheroes/:id` henter én helt (200, 404 hvis den ikke findes)
3. `POST /favorites` gemmer en favorit med body `{ "id": 1, "note": "..." }` (201, 400 ved ugyldig body, 404 hvis helten ikke findes, 409 hvis den allerede er favorit)
4. `GET /favorites` henter favoritterne (200)
5. `DELETE /favorites/:id` sletter en favorit (204, 404 hvis den ikke findes)

Stierne har ikke `/api` foran, fordi opgaven bruger dem uden.

## Struktur og hvorfor

```
routes/        vælger controller ud fra URL og metode
controllers/   håndterer request og response og vælger statuskode
models/        henter data fra det eksterne API og gemmer favoritter i et array
validators/    Joi tjekker body på POST /favorites, før controlleren kører
middlewares/   errorHandler samler fejl ét sted og ligger sidst i app.js
```

Favoritterne ligger i hukommelsen og forsvinder, når serveren genstartes.

## Valg vi har truffet

1. 201 på POST og 204 på DELETE, fordi opgaven ikke angiver succeskoder.
2. 404 både på GET af en ukendt helt og på POST af en favorit til en helt, der ikke findes.
3. 409 hvis samme helt gemmes to gange, så DELETE ikke sletter den forkerte.
4. 502 hvis det eksterne API er nede, så det kan skelnes fra vores egen 500.
5. errorHandler sender ikke interne fejlbeskeder til klienten, men logger dem på serveren.

## Test

Postman collectionen i `postman/` har 10 requests med tests og skal køres samlet i Runner, fordi favoritterne bygger på hinanden. Genstart serveren, hvis du kører den igen.

## Brug af AI

Jeg har brugt AI som støtte til opgaven. AI foreslog mappestrukturen og skrev udkast til koden: de to GET endpoints og senere favoritterne med Joi og errorHandler. Postman AI lavede en del af Postman collectionen, men gik i stå, så en anden AI lavede en importfil med de 10 requests og testene.

Jeg har selv skrevet koden ind i projektet i WebStorm, kørt den og læst den igennem, indtil jeg kunne forklare, hvad hver fil gør, og hvordan en request går fra routen til controlleren og modellen og tilbage. Jeg har selv tjekket opgaveteksten og valgt at beholde stierne uden /api, fordi opgaven bruger dem sådan.

Jeg har testet i Postman Runner. Før favoritterne var lavet, gav alle kald til /favorites 404, som forventet. Bagefter bestod alle 29 tests.

Statuskoderne 201 og 204, 404 på POST med en ukendt helt og 409 ved en dublet var forslag fra AI, som opgaven ikke nævner. Jeg valgte at beholde dem og har skrevet dem under "Valg vi har truffet".