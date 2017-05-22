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

### constructor()
In de constructor maken we pas de array "balls" echt aan, en vervolgens vullen we deze array met "ball" objecten door ze met een loop erin te pushen. Dit is hetzelfde voor de 2 paddle's, alleen geven we bij de paddle's een X en Y value mee. Ze staan namelijk op verschillende plekken.

### gameLoop()
In de gameLoop staat alle code die elke frame word uitgevoerd. Hierin loop ik alle ball objects uit de balls array en controleer ik of ze colliden met een van de paddles. Als ze colliden word de speed (richting) aangepast waardoor de bal zal wegkaatsen. Daarna word elke ball verplaatst door de move() function van het ball object. De paddle's worden ook aangeroepen om te verplaatsen, hier kom ik later op terug.

```typescript
/// <reference path="ball.ts"/>
class Game {
    
    // geef hier de ball instance een naam
    // ...
    private balls:Array<Ball>;
    private paddle1:Paddle;
    private paddle2:Paddle;
    
    constructor() {

        // Maak ball instances aan
        this.balls = new Array<Ball>();
        
        for(let i=0;i<20;i++){
            this.balls.push(new Ball());
        }

        // Maak paddle instance aan
        this.paddle1 = new Paddle(1, 20, window.innerHeight/2);
        this.paddle2 = new Paddle(2, window.innerWidth-100, window.innerHeight/2);
           
        // start de game loop        
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    
    private gameLoop(){

        // roep hier de move functie van de bal aan
        for(let b of this.balls){

            // collision detection paddle 1
            if (b.rect.left < this.paddle1.rect.left + this.paddle1.rect.width && b.rect.left + b.rect.width > this.paddle1.rect.left && b.rect.top < this.paddle1.rect.top + this.paddle1.rect.height && b.rect.height + b.rect.top > this.paddle1.rect.top) {
                // bubble collision detected!
                b.speedX = b.speed;
            }

            // collision detection paddle 2
            if (b.rect.left < this.paddle2.rect.left + this.paddle2.rect.width && b.rect.left + b.rect.width > this.paddle2.rect.left && b.rect.top < this.paddle2.rect.top + this.paddle2.rect.height && b.rect.height + b.rect.top > this.paddle2.rect.top) {
                // bubble collision detected!
                b.speedX = b.speed * -1;
            }

            b.move();
        }

        this.paddle1.move();
        this.paddle2.move();

        // hiermee wordt de gameloop opnieuw aangeroepen
        requestAnimationFrame(this.gameLoop.bind(this));
    }
} 
```

### ball.ts
In de ball.ts staat alle code gerelateerd tot de Ball objecten. De attributen en beweging word hierin geregelt.

#### declarations
blabla

### constructor()
blabla

### gameLoop()
blabla

```typescript
class Ball {
    
    private div : HTMLElement;
    private posX : number;
    private posY : number;
    public speedX : number;
    public speedY : number;
    public speed : number;
    public rect : ClientRect;
    
    constructor() {

        // creeer een div element
        this.div = document.createElement("ball");
        document.body.appendChild(this.div);
        
        
        // start positie
        this.posX = (Math.random() * (window.innerWidth/2)) + (window.innerWidth/4);
        this.posY = (Math.random() * (window.innerHeight/2)) + (window.innerHeight/4);
        
        // start snelheid
        this.speed = Math.ceil(Math.random() * 7)
        this.speedX = this.speed * 3;
        this.speedY = this.speed;
                
        // plaatsen
        this.move();
    }
    
    
    public move() : void {

        this.posX += this.speedX;
        this.posY += this.speedY;
        
        // als we buiten beeld gaan dan de snelheid omdraaien
        // gebruik window.innerWidth en window.innerHeight om te zien of we nog in beeld zijn
        // let op dat de bal 40 pixels breed en hoog is

        if (this.posX > window.innerWidth-40 || this.posX < 0){
            this.speedX = this.speedX * -1;
        }

        if (this.posY > window.innerHeight-40  || this.posY < 0){
            this.speedY = this.speedY * -1;
        }

        // update rect 
        this.rect = this.div.getBoundingClientRect();
        
        // transform gebruiken om de positie op het scherm aan te passen
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
    }
}
```