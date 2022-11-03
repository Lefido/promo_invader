
const game = document.querySelector('#game')

export default class Enemy {
    constructor() {
        let enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.width = "3.5vw";
        enemy.style.height = "5.5vh";

        let numEnemy = 1 + rand(10);
        enemy.style.background = `url("./assets/alien${numEnemy}.png") 100%/100% no-repeat`;
        enemy.style.backgroundSize = "100% 100%";
        enemy.style.position = "absolute";
        game.appendChild(enemy);
        this.enemy = enemy;
        this.cos = Math.cos(rand(360));
        this.sin = Math.sin(rand(360));
        let posX =  (game.clientWidth /2) - this.enemy.clientWidth / 2 ;
        let posY =  rand(game.clientHeight / 2);
        this.enemy.style.left = posX + "px";
        this.enemy.style.top = posY + 'px';
        this.x = posX
        this.y = posY
         this.dx = 25 + rand(75);
        this.dy = 25 + rand(75);
        this.velocityX = 1 + rand(2);
        this.velocityY = 1 + rand(2);
        this.bonus = numEnemy * 2;
        this.maxShoot = 500;
        this.countShoot = rand(this.maxShoot);
        this.compteurDirection = 0;
        this.compteurDirectionMax = 1 + rand(500);

        if (rand(2) === 0) {
            this.velocityX = - this.velocityX
            this.velocityY = - this.velocityY;
        }

        this.vCos = (1 + rand(5)) / 100;
        this.vSin = (1 + rand(5)) / 100;
        this.draw()

    }

    move() {

        this.compteurDirection++
        if (this.compteurDirection >= this.compteurDirectionMax) {
            this.velocityX = - this.velocityX;
            this.velocityY = - this.velocityY;
            this.compteurDirectionMax = 1 + rand(500);
            this.compteurDirection = 0;
        }

        this.cos +=this.vSin;
        this.sin +=this.vCos;

        if (this.cos >=359) {this.cos = 0}
        if (this.sin >=359) {this.sin = 0}

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x >= game.clientWidth - this.enemy.clientWidth || this.x <= 0) {
            this.velocityX = - this.velocityX
        }

        if (this.y >= game.clientHeight / 2 || this.y <= 0) {
            this.velocityY = - this.velocityY
        }

        this.draw();
    }

    draw() {

        this.countShoot ++;
        this.enemy.style.left = this.x + this.dx * Math.cos(this.cos) + "px";
        this.enemy.style.top = this.y + this.dy * Math.sin(this.sin) + "px";
    }

}

function rand(valRand) {
    return  Math.floor(Math.random() * valRand);
}