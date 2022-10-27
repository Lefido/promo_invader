

const game = document.querySelector('#game')

export default class Boss {
    constructor() {
        let boss = document.createElement('div');
        boss.classList.add('boss');
        boss.style.width = "16vw";
        boss.style.height = "24vh";

        let numBoss = 1 + rand(10);
        boss.style.background = `url("./assets/boss${numBoss}.png") 100%/100% no-repeat`;
        boss.style.backgroundSize = "100% 100%";
        boss.style.position = "absolute";
        game.appendChild(boss);
        this.boss = boss;
        this.cos = Math.cos(rand(360));
        this.sin = Math.sin(rand(360));
        let posX =  (game.clientWidth /2) - this.boss.clientWidth / 2 ;
        let posY =  rand(game.clientHeight / 3);
        this.boss.style.left = posX + "px";
        this.boss.style.top = posY + 'px';
        this.x = posX
        this.y = posY
         this.dx = 25 + rand(75);
        this.dy = 25 + rand(20);
        this.velocityX = 1 + rand(2);
        this.velocityY = 1 + rand(2);
        this.bonus = numBoss * 2;
        this.maxShoot = 500;
        this.degat = 0;
        this.resistance = 2000;
        this.countShoot = rand(this.maxShoot);

        if (rand(2) === 0) {
            this.velocityX = - this.velocityX
            this.velocityY = - this.velocityY;
        }

        this.vCos = (1 + rand(5)) / 100;
        this.vSin = (1 + rand(5)) / 100;
        this.draw()

    }

    move() {

        this.cos +=this.vSin;
        this.sin +=this.vCos;

        if (this.cos >=359) {this.cos = 0}
        if (this.sin >=359) {this.sin = 0}

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x >= game.clientWidth - this.boss.clientWidth || this.x <= 0) {
            this.velocityX = - this.velocityX
        }

        if (this.y >= game.clientHeight / 3 || this.y <= 0) {
            this.velocityY = - this.velocityY
        }

        this.draw();
    }

    impact() {
        this.degat += 10

    }

    draw() {

        this.countShoot ++;
        this.boss.style.left = this.x + this.dx * Math.cos(this.cos) + "px";
        this.boss.style.top = this.y + this.dy * Math.sin(this.sin) + "px";
    }

}

function rand(valRand) {
    return  Math.floor(Math.random() * valRand);
}