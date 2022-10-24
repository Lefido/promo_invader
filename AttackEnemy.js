
const game = document.querySelector('#game')

export default class AttackEnemy {

    constructor(enemy) {


        let enemyMissile = document.createElement('div');
        enemyMissile.classList.add("missiles")
        enemyMissile.style.width = "0.5vw";
        enemyMissile.style.height = "1vh";
        enemyMissile.style.backgroundColor = 'green';
        enemyMissile.style.position = "absolute";
        enemyMissile.style.zIndex = "-100";
        enemyMissile.style.zIndex ="2";
        enemyMissile.style.borderRadius = "50%"
        let posX = enemy.enemy.offsetLeft + enemy.enemy.offsetWidth / 2 ;
        let posY = enemy.enemy.offsetTop + enemy.enemy.offsetHeight ;
        enemyMissile.style.left = posX + "px";
        enemyMissile.style.top = posY + "px";
        game.appendChild(enemyMissile);
        this.enemyMissile = enemyMissile;
        this.x = posX;
        this.y = posY;
        this.velocity = 4;
        this.laser = new Audio('./assets/laser_enemy.mp3')
        this.laser.play()

    }

    move() {
        this.y += this.velocity;
        this.draw();
    }

    draw() {
        this.enemyMissile.style.left = this.x + "px";
        this.enemyMissile.style.top = this.y + "px";
    }

}