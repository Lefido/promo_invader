
const game = document.querySelector('#game');

export default class Dead_enemy {
    constructor(enemy) {

        let dead = document.createElement('div')
        dead.classList.add('dead');
        dead.style.position = "absolute";
        dead.style.width = enemy.style.width //"4vw";
        dead.style.height = enemy.style.height //"5vh";
        dead.style.left = enemy.style.left
        dead.style.top = enemy.style.top
        dead.style.background = enemy.style.background
        dead.style.background = 'url("./assets/explode-boom.gif") 90%/50% no-repeat';
        game.appendChild(dead);
        this.dead = dead;
        this.x = enemy.offsetLeft
        this.y = enemy.offsetTop
        this.velocity = 1
        this.duration = 0
        this.explosion = new Audio('./assets/explosion.mp3')
        this.explosion.play()

    }

    move() {
        this.duration += 1
        this.y += this.velocity;
        this.draw();
    }

    draw() {

        this.dead.style.left = this.x + "px";
        this.dead.style.top = this.y + "px";

    }

}

