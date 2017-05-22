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