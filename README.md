# PRG04-Week3-oefening1

## Pong

Voor het startproject van Pong heb ik het onderstaande toegevoegd:

- Ball instances in game.ts
- De game loop roept de move() functie van de ball aan
- De ball kan niet uit het scherm, en kaatst weg
- Een paddle.ts class met keyboard controls
- In game.ts collision detection tussen de balls en de paddle
- Als de ball en paddle elkaar raken zal de ball wegkaatsen
- Twee paddles met eigen controls (2 spelers)

## game.ts
*In de game.ts bevind zich alle code gerelateerd tot de "game". Hierin staat o.a. de gameloop die elke frame zichzelf herhaalt.  Ook worden hier de game instances/objecten aangemaakt en worden bepaalde functies aangeroepen elke frame.*

#### declarations
Ik gebruik een array object voor de balls, aangezien we meerdere ballen willen. Vervolgens maak ik 2 verschillende paddle elementen aan. Ik maak hier geen gebruik van een array, omdat ik weet dat er maar maximaal 2 paddle's in de game zullen zitten.

#### constructor()
In de constructor maken we pas de array "balls" echt aan, en vervolgens vullen we deze array met "ball" objecten door ze met een loop erin te pushen. Dit is hetzelfde voor de 2 paddle's, alleen geven we bij de paddle's een X en Y value mee. Ze staan namelijk op verschillende plekken.

#### gameLoop()
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

## ball.ts
*In de ball.ts staat alle code gerelateerd tot de Ball objecten. De attributen en beweging word hierin geregelt.*

#### declarations
We gebruiken een HTMLElement die we uiteindelijk op het scherm laten zien. Ook moet de ball variabelen hebben om de positie bij te kunnen houden. Ik gebruik rect om de ClientRect (dimenties) van het object bij te kunnen houden.

#### constructor()
In de constuctor maken we een nieuw html element aan met een semantische tag die door de CSS code herkent word. Daarna voegen we dit element toe aan de body van de pagina. Verder word een random start positie en snelheid gegenereerd. Ik gebruik een speed variabele om echt de letterlijke snelheid op te slaan. Met speedX en speedY geef ik aan hoeveel pixels het object elke frame moet verplaatsen. Dit is dus een verschil, aangezien ik bij collision de speedX wil kunnen forceren naar een positief of negatief getal.

#### move()
In de move() functie word de ball verplaats. Ook word de rect variabele geupdate bij elke move().

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

## paddle.ts
*In de paddle.ts staat alle code gerelateerd tot de Paddle objecten. De attributen en beweging word hierin geregelt.*

#### declarations
In de declaratie van de variabelen doen we eigenlijk hetzelfde als de ball. Alleen gebruiken we een "id" variable om aan te geven om welke speler het gaat. We willen namelijk verschillende controls voor de 2 paddle's.

#### constructor()
In de constuctor worden 3 parameters verwerkt bij de creatie van het object. Het ID en de start positie word hierin meegegeven. Vervolgens worden 2 listeners aangemaakt voor de keyboard controls. Een als je een key indrukt, en een als je een key los laat.

#### onKeyDown() & onKeyUp
In deze functies word het keyboard element verwerkt als deze aangeroepen worden. Er word eerst gekeken om welke speler het gaat (1 of 2). En vervolgens word gecontroleerd of de juiste key's worden ingedrukt. Als we bijvoorbeeld "W" indrukken, word gezien dat (event.keyCode) in deze **case** voor de **W** toets staat. Dan word de **upSpeed** of **downSpeed** aangepast zodat de paddle word verplaatst in bijhorende directie in de **move()**. 

Het mooie aan een keyUp en een keyDown gebruiken is dat de **upSPeed** of **downSpeed** op 0 word gezet zodra de key word losgelaten.

```typescript
class Paddle {

    private div : HTMLElement;
    private posX : number;
    private posY : number;
    private speed : number;
    private upSpeed : number;
    private downSpeed : number;
    public rect : ClientRect;
    private id : number;
    
    constructor(id, startX, startY) {

        console.log("startX = "+startX);

        // keyboard listeners
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));

        // creeer een div element
        this.div = document.createElement("paddle");
        document.body.appendChild(this.div);

        // set rect
        this.rect = this.div.getBoundingClientRect();
        
        // id
        this.id = id;

        // start positie
        this.posX = startX;
        this.posY = startY;
        
        // set speed
        this.speed = 10;
        this.upSpeed = 0;
        this.downSpeed = 0;
                
        this.move;
    }
    
    public move(){

        // verplaats
        this.posY = this.posY + this.downSpeed - this.upSpeed;

        // als paddle uit beeld gaat, verplaats naar de rand
        if (this.posY < 0){
            this.posY = 0;
        }
        if (this.posY > window.innerHeight - this.rect.height){
            this.posY = window.innerHeight - this.rect.height;
        }

        // update rect 
        this.rect = this.div.getBoundingClientRect();

        // transform gebruiken om de positie op het scherm aan te passen
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
    }

    
    private onKeyDown(event:KeyboardEvent):void {

        //Player 1
        if (this.id == 1){

            switch(event.keyCode){
            case 83:
                this.downSpeed = this.speed;
                break;
            case 87:
                this.upSpeed = this.speed;
                break;
            }
        }

        //Player 2
        else{
            switch(event.keyCode){
            case 40:
                this.downSpeed = this.speed;
                break;
            case 38:
                this.upSpeed = this.speed;
                break;
            }
        }
    }
    
    private onKeyUp(event:KeyboardEvent):void {
        //Player 1
        if (this.id == 1){

            switch(event.keyCode){
            case 83:
                this.downSpeed = 0;
                break;
            case 87:
                this.upSpeed = 0;
                break;
            }
        }

        //Player 2
        else{
            switch(event.keyCode){
            case 40:
                this.downSpeed = 0;
                break;
            case 38:
                this.upSpeed = 0;
                break;
            }
        }
    }
}
```