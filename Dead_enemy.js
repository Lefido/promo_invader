
const game = document.querySelector('#game');

export default class Dead_enemy {
    constructor(enemy, bonus) {

        let dead = document.createElement('div')
        dead.classList.add('dead');
        dead.style.position = "absolute";
        dead.style.width = "4wv" //enemy.style.width / 2 //"4vw";
        dead.style.height = "4vh" // enemy.style.height / 2 //"5vh";
        dead.style.left = enemy.style.left
        dead.style.top = enemy.style.top
        dead.style.background = enemy.style.background
        dead.style.background = 'url("./assets/explode-boom.gif") 90%/50% no-repeat';
        dead.style.color = `rgb(${rand(155)}, ${rand(155)}, ${rand(155)})`
        dead.style.fontSize = "5px"
        dead.style.textAlign = "center"
        dead.innerHTML = bonus + " Pts";

        game.appendChild(dead);
        this.dead = dead;

        this.x = dead.offsetLeft - dead.offsetWidth / 2
        this.y = dead.offsetTop
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

function rand(numColor) {
    return 50 + Math.floor(Math.random() * numColor)
}

