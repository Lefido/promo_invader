
const game = document.querySelector('#game')

export default class Missile {
    constructor(player) {
        let missile = document.createElement('div');
        missile.classList.add("missiles")
        missile.style.width = "0.5vw";
        missile.style.height = "1vh";
        // missile.style.background = 'url("./assets/missile_1.png") 100%/100% no-repeat';
        missile.style.backgroundColor = 'red';
        missile.style.borderRadius = "50%";
        missile.style.position = "absolute";
        missile.style.zIndex = "-100";
        game.appendChild(missile);
        this.missile = missile;
        let posX = player.player.offsetLeft + player.player.offsetWidth / 2 - this.missile.offsetWidth/2
        let posY = player.player.offsetTop;
        this.missile.style.left = posX + 'px';
        this.missile.style.top = posY + 'px';
        this.x = posX;
        this.y = posY;
        this.velocity = 6;
        this.laser = new Audio('./assets/laser.mp3')
        this.laser.volume = 0.3;
        this.laser.play()

    }

    move() {
            this.y -= this.velocity;
            this.draw();
    }

    draw() {
        this.missile.style.left = this.x + "px";
        this.missile.style.top = this.y + "px";
    }

}