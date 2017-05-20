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

    
    onKeyDown(event:KeyboardEvent):void {

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
    
    onKeyUp(event:KeyboardEvent):void {
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