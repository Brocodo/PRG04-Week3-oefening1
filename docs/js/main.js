var Ball = (function () {
    function Ball() {
        this.div = document.createElement("ball");
        document.body.appendChild(this.div);
        this.posX = (Math.random() * (window.innerWidth / 2)) + (window.innerWidth / 4);
        this.posY = (Math.random() * (window.innerHeight / 2)) + (window.innerHeight / 4);
        this.speed = Math.ceil(Math.random() * 7);
        this.speedX = this.speed * 3;
        this.speedY = this.speed;
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
        this.rect = this.div.getBoundingClientRect();
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = new Array();
        for (var i = 0; i < 20; i++) {
            this.balls.push(new Ball());
        }
        this.paddle1 = new Paddle(1, 20, window.innerHeight / 2);
        this.paddle2 = new Paddle(2, window.innerWidth - 100, window.innerHeight / 2);
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            if (b.rect.left < this.paddle1.rect.left + this.paddle1.rect.width && b.rect.left + b.rect.width > this.paddle1.rect.left && b.rect.top < this.paddle1.rect.top + this.paddle1.rect.height && b.rect.height + b.rect.top > this.paddle1.rect.top) {
                b.speedX = b.speed;
            }
            if (b.rect.left < this.paddle2.rect.left + this.paddle2.rect.width && b.rect.left + b.rect.width > this.paddle2.rect.left && b.rect.top < this.paddle2.rect.top + this.paddle2.rect.height && b.rect.height + b.rect.top > this.paddle2.rect.top) {
                b.speedX = b.speed * -1;
            }
            b.move();
        }
        this.paddle1.move();
        this.paddle2.move();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Paddle = (function () {
    function Paddle(id, startX, startY) {
        var _this = this;
        console.log("startX = " + startX);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        this.div = document.createElement("paddle");
        document.body.appendChild(this.div);
        this.rect = this.div.getBoundingClientRect();
        this.id = id;
        this.posX = startX;
        this.posY = startY;
        this.speed = 10;
        this.upSpeed = 0;
        this.downSpeed = 0;
        this.move;
    }
    Paddle.prototype.move = function () {
        this.posY = this.posY + this.downSpeed - this.upSpeed;
        if (this.posY < 0) {
            this.posY = 0;
        }
        if (this.posY > window.innerHeight - this.rect.height) {
            this.posY = window.innerHeight - this.rect.height;
        }
        this.rect = this.div.getBoundingClientRect();
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    Paddle.prototype.onKeyDown = function (event) {
        if (this.id == 1) {
            switch (event.keyCode) {
                case 83:
                    this.downSpeed = this.speed;
                    break;
                case 87:
                    this.upSpeed = this.speed;
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case 40:
                    this.downSpeed = this.speed;
                    break;
                case 38:
                    this.upSpeed = this.speed;
                    break;
            }
        }
    };
    Paddle.prototype.onKeyUp = function (event) {
        if (this.id == 1) {
            switch (event.keyCode) {
                case 83:
                    this.downSpeed = 0;
                    break;
                case 87:
                    this.upSpeed = 0;
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case 40:
                    this.downSpeed = 0;
                    break;
                case 38:
                    this.upSpeed = 0;
                    break;
            }
        }
    };
    return Paddle;
}());
//# sourceMappingURL=main.js.map