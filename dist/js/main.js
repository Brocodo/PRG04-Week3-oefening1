var Ball = (function () {
    function Ball() {
        this.div = document.createElement("ball");
        document.body.appendChild(this.div);
        this.posX = (Math.random() * (window.innerWidth / 2)) + (window.innerWidth / 4);
        this.posY = (Math.random() * (window.innerHeight / 2)) + (window.innerHeight / 4);
        this.speedX = Math.ceil(Math.random() * 7);
        this.speedY = Math.ceil(Math.random() * 7);
        this.move();
    }
    Ball.prototype.move = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
        if (this.posX > window.innerWidth - 40 || this.posX < 0) {
            this.speedX = this.speedX * -1;
        }
        if (this.posY > window.innerHeight - 40 || this.posY < 0) {
            this.speedY = this.speedY * -1;
        }
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = new Array();
        for (var i = 0; i < 100; i++) {
            this.balls.push(new Ball());
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            b.move();
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Paddle = (function () {
    function Paddle() {
    }
    Paddle.prototype.move = function () {
    };
    return Paddle;
}());
//# sourceMappingURL=main.js.map