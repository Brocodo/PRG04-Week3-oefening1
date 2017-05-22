# PRG04-Week3-oefening1

## Pong

Voor het startproject van Pong kreeg ik de onderstaande opdrachten:

- Maak een ball instance aan in game.ts
- De game loop roept de move() functie van de ball aan
- Hoe weet de bal of hij uit het scherm gaat? Wat moet er dan gebeuren?
- Laat 20 ballen over het scherm bewegen
- Maak de paddle.ts class af
- Bestudeer de [voorbeeldcode](https://github.com/HR-CMGT/PRG04-Week3-examples)
- Voeg keyboard input toe aan de paddle.ts class
- Maak een paddle instance aan in game.ts
- Voeg in game.ts collision detection toe tussen de balls en de paddle
- Wat moet er gebeuren als een ball een paddle raakt?
- Kan je twee paddles toevoegen die elk hun eigen keyboard controls hebben?

### game.ts
In de game.ts bevind zich alle code gerelateerd tot de "game". Hierin staat o.a. de gameloop die elke frame zichzelf herhaalt.  Ook worden hier de game instances/objecten aangemaakt en worden bepaalde functies aangeroepen elke frame.

#### declarations
Ik gebruik een array object voor de balls, aangezien we meerdere ballen willen. Vervolgens maak ik 2 verschillende paddle elementen aan. Ik maak hier geen gebruik van een array, omdat ik weet dat er maar maximaal 2 paddle's in de game zullen zitten.

[link](https://github.com/Brocodo/PRG04-Week3-oefening1/commit/c9c83e0694ab4a6d892d14b4eda158e256a57191#diff-1b0b669417ae7bc4e64e505cfdc0ded3L4)

```typescript
Test
```