/// <reference path="ball.ts"/>
class Game {
    
    // geef hier de ball instance een naam
    // ...
    private balls:Array<Ball>;
    
    constructor() {

        this.balls = new Array<Ball>();
        
        for(let i=0;i<100;i++){
            this.balls.push(new Ball());
        }
           
        // start de game loop        
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    
    private gameLoop(){
        // roep hier de move functie van de bal aan
        for(let b of this.balls){
            b.move();
        }
        // hiermee wordt de gameloop opnieuw aangeroepen
        requestAnimationFrame(this.gameLoop.bind(this));
    }
} 