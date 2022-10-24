
const game = document.querySelector('#game')

import Player from './Player.js';
import Missile from './Missile.js';
import Enemy from './Enemy.js';
import Dead_enemy from "./Dead_enemy.js";
import AttackEnemy from "./AttackEnemy.js";

let play_game = true
let start = false;

let score = 0;

const  player = new Player();
const keys = {};
var tabMissile = [];
var tabEnemy = [];
var tabEnemyDead = [];
var tabMissEnemy = [];

const score_Affiche = document.querySelector('.score')
const puissance = document.querySelector(".puissance-position")
const life = document.querySelector(".life")
const game_over = document.querySelector('#game-over')

const new_game = document.querySelector('#new-game')

new_game.addEventListener('click', function (){

   if (start) {
       start = false;

   } else {
       start = true;
       score = 0;
       restore_sprite()
       score_Affiche.innerHTML = "0";
       life.innerHTML = "3";
       new_game.style.visibility = "hidden"
       game_over.style.visibility = "hidden"
   }

   console.log(start)

})

setInterval( running, 10);
setInterval( groupEnemy , 3000);

function running() {

        if (start) {

        pressKey();
        moveMissile();
        moveEnemy();
        moveMissileEnemy();
        collision_Missile_Enemy();
        collision_Missile_Player();
        moveEnemyDead();

        }

}

function pressKey() {
    document.onkeydown = function (e) {

        // console.log(e.code);

        if (e.code === "Space" && tabMissile.length <= 10) {
            // let x = player.player.offsetLeft + player.player.offsetWidth /2
            // let y = player.player.offsetTop;
            let missile = new Missile(player)
            // console.log("New missile, position :", player.player.offsetLeft, player.player.offsetTop)
            tabMissile.push(missile);
            // console.log("Missile Actif : ", tabMissile.length)

        }

        if (e.code === "KeyE") {
            // let x = player.player.offsetLeft + player.player.offsetWidth /2
            // let y = player.player.offsetTop;
            let enemy = new Enemy()
            // console.log("New missile, position :", player.player.offsetLeft, player.player.offsetTop)
            tabEnemy.push(enemy);
            // console.log("Enemy Actif : ", tabEnemy.length)

        }

    };

    onkeydown = onkeyup = function (e) {
        keys[e.code] = e.type === "keydown";
    };

    if (keys["ArrowLeft"]) {
        player.dep_left();
    }

    if (keys["ArrowRight"]) {
        player.dep_right();
    }
}

function moveMissile() {
    tabMissile.forEach( function (missile, id) {
        missile.move()
        if (missile.y < 0 ) {
            tabMissile.splice(id, 1);
            missile.missile.remove();
            // console.log("Missile restant : ", tabMissile.length)
        }



    })
}

function groupEnemy() {

    if (tabEnemy.length === 0 && start) {

        const missiles = document.querySelectorAll('.missiles')

        missiles.forEach(function (missile) {
            missile.remove();
        })

        let nbEnemy = rand(15);
        for (let i = 0; i < nbEnemy; i++) {
            let enemy = new Enemy()
            tabEnemy.push(enemy);
        }

    }
}

function moveEnemy() {

    tabEnemy.forEach(function (enemy) {

        if (enemy.countShoot >= enemy.maxShoot) {
            enemy.countShoot = rand(enemy.maxShoot)
            attackEnemy()
        }
        enemy.move();
    })

}

function collision_Missile_Enemy() {

   tabMissile.forEach(function (missile, id_missile) {
       let mx = missile.x + missile.missile.offsetWidth / 2;
       let my = missile.y;
       // console.log("Missile (", mx,",", my,")");
       tabEnemy.forEach(function (enemy, id_enemy) {
            let ex1 = enemy.x;
            let ey1 = enemy.y;
            let ex2 = ex1 + enemy.enemy.offsetWidth;
            let ey2 = ey1 + enemy.enemy.offsetHeight;
            if (mx >= ex1 && mx <= ex2 && my >= ey1 && my <= ey2) {
                // console.log("Enemy" , id_enemy, "Touché")

                score += enemy.bonus
                score_Affiche.innerHTML = score

                tabEnemyDead.push(new Dead_enemy(enemy.enemy, enemy.bonus))

                tabMissile.splice(id_missile,1);
                missile.missile.remove();

                tabEnemy.splice(id_enemy,1);
                enemy.enemy.remove()



            }
           // console.log("Enemy",id_enemy, ex1, ey1, ex2, ey2);
           // console.log("Enemy restant", tabEnemy.length);


       })

   })

}

function moveEnemyDead() {

    tabEnemyDead.forEach(function (dead, idx) {
        dead.move()
        if (dead.duration >= 100) {
            tabEnemyDead.splice(idx, 1);
            dead.dead.remove()
        }

    })

}

function attackEnemy() {

    if (tabEnemy.length > 0 ) {

        let rnd = Math.floor(Math.random() * tabEnemy.length)
        let enemyChoice = tabEnemy[rnd];
        tabMissEnemy.push(new AttackEnemy(enemyChoice));

    }

}

function moveMissileEnemy() {

    tabMissEnemy.forEach(function (missile, id) {

        missile.move();
        if (missile.y >= game.clientHeight) {

            tabMissEnemy.splice(id, 1);
            missile.enemyMissile.remove();

        }

    })


}

function rand(nbElement) {
    return 1 + Math.floor(Math.random() * nbElement);
}

function collision_Missile_Player() {

    tabMissEnemy.forEach(function (missile, id_missile) {
        let mx = missile.x + missile.enemyMissile.offsetWidth / 2
        let my = missile.y + missile.enemyMissile.offsetHeight

        let px1 = player.x;
        let py1 = player.y;
        let px2 = player.x + player.player.offsetWidth
        let py2 = player.y + player.player.offsetHeight

        if (mx >= px1 && my >= py1 && mx <= px2 && my <= py2) {

            tabMissEnemy.splice(id_missile, 1)
            missile.enemyMissile.remove()
            player.player.classList.add('impact-player')
            player.impact();
            puissance.style.width = player.puissance + "%"
            life.innerHTML = player.vie

            if (player.vie === 0 ) {

                player.end_game()
                new_game.style.visibility = "visible"
                game_over.style.visibility = "visible"
                player.vie = 3;
                player.puissance = 100;
                start = false;

            }

            setTimeout( function () {
                player.player.classList.remove('impact-player')
            }, 2000)

        }

      })

}

function restore_sprite() {

    tabEnemy.forEach( (enemy) => {
        enemy.enemy.remove()
    })

    tabEnemy = [];

    tabMissEnemy.forEach( (missile) => {
        missile.enemyMissile.remove()
    })

    tabMissEnemy = [];

    tabMissile.forEach( (missile) => {
        missile.missile.remove()
    })

    tabMissile = [];

    tabEnemyDead.forEach( (dead) => {
        dead.enemy.remove()
    })

    tabEnemyDead = [];

}
