

const game = document.querySelector('#game')

export default class Player {
    constructor() {
        let player = document.createElement('div');
        // player.classList.add('player');
        player.setAttribute("id","player")
        player.style.width = "5vw";
        player.style.height = "8vh";
        player.style.background = 'url("./assets/vaisseau.png") 100%/100% no-repeat';
        player.style.position = "absolute";
        game.appendChild(player);
        this.player = player;
        this.player.style.left = game.clientWidth / 2 - player.clientWidth / 2 + 'px';
        this.player.style.top = game.clientHeight - (player.clientHeight + player.clientHeight /4) + 'px';
        this.x = player.offsetLeft
        this.y = player.offsetTop
        this.velocity = 8;
        this.vie = 3;
        this.puissance = 100;
        this.sound = new Audio('./assets/impact-player.mp3')
        this.warning = new Audio('./assets/beep-warning.mp3')
        this.endgame = new Audio('./assets/end_game.mp3')
        // this.draw()

    }

    dep_left() {
        if (this.x >= 0 ) {
            this.x -= this.velocity;
            this.draw()
        }
    }

    dep_right() {
        if (this.x <= game.clientWidth - this.player.clientWidth ) {
            this.x += this.velocity;
            this.draw()
        }
    }

    draw() {
        this.player.style.left = this.x + "px";
        this.player.style.top = this.y + "px";
    }

    impact() {
        this.puissance = this.puissance - 20;
        if (this.puissance <= 0 ) {
            this.life()
            this.puissance = 100;
        }
        this.sound.play()
        console.log((this.puissance))
    }

    life() {
        this.vie--;
        console.log("Vie", this.vie)
        this.warning.play()

    }

    end_game() {
        this.endgame.play()
    }

}