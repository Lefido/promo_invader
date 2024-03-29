
const game = document.querySelector('#game')

import Player from './Player.js';
import Missile from './Missile.js';
import Enemy from './Enemy.js';
import Dead_enemy from "./Dead_enemy.js";
import AttackEnemy from "./AttackEnemy.js";
import Boss from "./Boss.js";
import NewLife from "./NewLife.js";
import Etoile from "./Etoile.js";

let music = new Audio('./assets/music.mp3')
music.play();
music.loop = true;
// music.loop();
let alert = new Audio('./assets/alert.mp3')
let msgBoss = new Audio('./assets/msg_boss.mp3')

let start = false;
let compteurBoss = 0;
let bossActif = false;
let declencheBoss = 40;
let enemyActif = true;
let addLife = 60;
let compteurLife = 0;

let score = 0;

const  player = new Player();
const keys = {};
var tabEtoile = [];
var tabMissile = [];
var tabEnemy = [];
var tabEnemyDead = [];
var tabMissEnemy = [];
var tabBoss = [];
var tabNewLife = [];
let lifeActive = true;

const score_Affiche = document.querySelector('.score')
const puissance = document.querySelector(".puissance-position")
const life = document.querySelector(".life")
const game_over = document.querySelector('#game-over')
const new_game = document.querySelector('#new-game')
const msg_boss = document.querySelector('#msg-boss')
const cadre_boss = document.querySelector('#cadre-boss')
const degat_boss = document.querySelector('#degat-boss')

// newEtoile(50);

new_game.addEventListener('click', function (){

   if (start) {
       start = false;

   } else {
       start = true;
       score = 0;
       compteurBoss = 0;
       compteurLife = 0
       bossActif = false;
       music.play();
        music.loop = true;
        msgBoss.pause();
       restore_sprite();
       restoreBoss();
       score_Affiche.innerHTML = "0";
       life.innerHTML = "3";
       new_game.style.visibility = "hidden";
       game_over.style.visibility = "hidden";
       cadre_boss.style.visibility = "hidden";
   }

   console.log("Start", start)

})



setInterval( running, 10);

function running() {

        if (start) {

        pressKey();
        move_new_life();
        moveMissile();
        moveEnemy();
        moveMissileEnemy();
        collision_Missile_Enemy();
        collision_Missile_Player();
        moveEnemyDead();
        // moveEtoile();
        
    
        if (!bossActif) {

            if (tabEnemy.length == 0 && enemyActif) {
                // console.log('Ajout enemy')
                alert.play();
                setTimeout(groupEnemy, 2500)
                enemyActif = false;
                
            }

        } else {

            if (tabBoss.length === 0) {

                let newBoss = new Boss();
                // console.log("New bosss !!")
                tabBoss.push(newBoss);
                // console.log(tabBoss);

            }

            moveBoss();
            collision_Missile_Boss()

        }


        }

}

function newEtoile(nbEtoile) {

    for(let i = 0 ; i <= nbEtoile; i++) {

        let etoile = new Etoile();
        tabEtoile.push(etoile);

    }

}

function moveEtoile() {

    tabEtoile.forEach(function(etoile) {
        etoile.move();
    })

}

function pressKey() {
    document.onkeydown = function (e) {

        // console.log(e.code);

        if (start) {

            if (e.code === "Space" && tabMissile.length <= 5 && tabEnemy.length != 0 || e.code === "Space" && tabMissile.length <= 5 && tabBoss.length != 0 ) {
                // let x = player.player.offsetLeft + player.player.offsetWidth /2
                // let y = player.player.offsetTop;
                let missile = new Missile(player)
                // console.log("New missile, position :", player.player.offsetLeft, player.player.offsetTop)
                tabMissile.push(missile);
                // console.log("Missile Actif : ", tabMissile.length)

            }

        }

        // if (e.code === "KeyE") {
        //     let x = player.player.offsetLeft + player.player.offsetWidth /2
        //     let y = player.player.offsetTop;
        //     let enemy = new Enemy()
        //     console.log("New missile, position :", player.player.offsetLeft, player.player.offsetTop)
        //     tabEnemy.push(enemy);
        //     console.log("Enemy Actif : ", tabEnemy.length)

        // }

        if (e.code === "Escape") {
           
            if (start) {
                console.log('Pause')
                start = false
                let pause = document.createElement('h2')
                pause.classList.add('pause');
                pause.style.position = "absolute";
                pause.innerHTML = "PAUSE";
                pause.style.fontSize = "50px";
                pause.style.left = "50%";
                pause.style.top = "50%";
                pause.style.transform = "translatex(-50%)";
                pause.style.fontFamily = "'Wallpoet', cursive";
                game.appendChild(pause);

                
            } else {
                console.log('Deposed')
                start = true
                let pause = document.querySelector('.pause');
                pause.remove();
            }

        }

        

    };

    onkeydown = onkeyup = function (e) {
        keys[e.code] = e.type === "keydown";
        console.log(e.code)
    };

    

    if (keys["ArrowLeft"] || keys["KeyA"]) {
        player.dep_left();
        // let paralax = 50 - player.x / 15
        // game.style.background = `url("./assets/fond-lunaire.jpg") ${paralax}px / 100% no-repeat`;
    }

    if (keys["ArrowRight"] || keys["KeyD"]) {
        player.dep_right();
        // let paralax = 50 - player.x / 15
        // game.style.background = `url("./assets/fond-lunaire.jpg") ${paralax}px / 100% no-repeat`;
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

    // if (tabEnemy.length === 0 && start) {

        const missiles = document.querySelectorAll('.missiles')

        missiles.forEach(function (missile) {
            missile.remove();
        })
       
        let nbEnemy = rand(15);
        for (let i = 0; i < nbEnemy; i++) {
            let enemy = new Enemy()
            tabEnemy.push(enemy);
        }

        enemyActif = true

    // }
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
                compteurLife++;
                compteurBoss++;

                if (compteurLife > 0 && compteurLife % addLife === 0 ) {
                    lifeActive = true
                    new_Life()
                }

                if (compteurBoss % declencheBoss === 0) {
                    
                    // music.loop = false;
                    cadre_boss.style.visibility = "visible";
                    // degat_boss.style.height = "100%";
                    
                    music.pause();
                    msgBoss.play();
                    msgBoss.loop = true;
                    msg_boss.style.visibility = "Visible";
                    setTimeout(function (){msg_boss.style.visibility = "hidden"}, 5000)
                    bossActif = true
                }
                score_Affiche.innerHTML = score
                score_Affiche.classList.add('clignote')
                setTimeout(function(){score_Affiche.classList.remove('clignote')}, 1000)

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
        let posX = enemyChoice.enemy.offsetLeft + enemyChoice.enemy.offsetWidth / 2 ;
        let posY = enemyChoice.enemy.offsetTop + enemyChoice.enemy.offsetHeight ;
        tabMissEnemy.push(new AttackEnemy(posX, posY));

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

            tabMissEnemy.splice(id_missile, 1);
            missile.enemyMissile.remove();
            player.player.classList.add('impact-player');
            player.impact();
            puissance.style.width = player.puissance + "%";
            life.innerHTML = player.vie;
            
             if (player.vie === 0 ) {

                player.end_game()
                new_game.style.visibility = "visible"
                game_over.style.visibility = "visible"
                player.vie = 3;
                player.puissance = 100;
                new_game.innerHTML = "NEW GAME"
                start = false;
                music.pause();
                msgBoss.pause();
               
            }

            setTimeout( function () {
                player.player.classList.remove('impact-player')
            }, 2000)

        }

      })

}

function moveBoss() {
    tabBoss.forEach(function(boss) {

        if (boss.countShoot >= boss.maxShoot) {
            boss.countShoot = rand(boss.maxShoot)

            attackBoss();
        }
        boss.move();
       

    })
}

function attackBoss() {

        let boss = tabBoss[tabBoss.length-1];
        // console.log(boss.x);

        let posX = boss.boss.offsetLeft;
        let posY = boss.boss.offsetTop + boss.boss.offsetHeight ;
        tabMissEnemy.push(new AttackEnemy(posX, posY));

        posX = boss.boss.offsetLeft + boss.boss.offsetWidth / 2;
        posY = boss.boss.offsetTop + boss.boss.offsetHeight ;
        tabMissEnemy.push(new AttackEnemy(posX, posY));

        posX = boss.boss.offsetLeft + boss.boss.offsetWidth;
        posY = boss.boss.offsetTop + boss.boss.offsetHeight ;
        tabMissEnemy.push(new AttackEnemy(posX, posY));


}

function restoreBoss() {

    tabBoss.forEach(function(boss, idb) {
        boss.boss.remove();
        tabBoss.splice(idb, 1);

    })

}

function collision_Missile_Boss() {

    tabMissile.forEach(function(missile, idM) {

        let mx = missile.x;
        let my = missile.y;

        tabBoss.forEach(function(boss, idb) {

            let bx1 = boss.x;
            let by1 = boss.y;
            let bx2 = boss.x + boss.boss.offsetWidth;
            let by2 = boss.y + boss.boss.offsetHeight;

        
            if (mx >= bx1 && my >= by1 && mx <= bx2 && my <= by2) {
                
                // console.log("Boss touché");
                tabEnemyDead.push(new Dead_enemy(missile.missile, 10))
                score += 10;
                compteurLife++;

                if (compteurLife > 0 && compteurLife % addLife === 0 ) {
                    lifeActive = true
                    new_Life()
                }
                // compteurBoss += 1;
                score_Affiche.innerHTML = score
                score_Affiche.classList.add('clignote')
                setTimeout(function(){score_Affiche.classList.remove('clignote')}, 1000)

                boss.impact();
                tabMissile.splice(idM, 1);
                missile.missile.remove();
                let val_degat = 100 * boss.degat / boss.resistance
                degat_boss.style.height = 100 - val_degat + "%";
                // console.log("Dégat: ", boss.degat, "Resistance: ", boss.resistance)
                degat_boss.classList.add('impact-boss')
                setTimeout(function(){degat_boss.classList.remove('impact-boss')}, 1000)
                // degat_boss.style.Height = boss.degat      
                if (boss.degat >= boss.resistance) {
                    // compteurBoss+= 15;
                    // console.log("Boss Mort");
                    boss.boss.remove();
                    tabBoss.splice(idb, 1);
                    bossActif = false;
                    music.play();
                    msgBoss.pause();
                    cadre_boss.style.visibility = "hidden";
                    degat_boss.style.height = "100%";

                }

            }

        })

                
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

function new_Life() {

        if (lifeActive) {

        lifeActive = false;
        let life = new NewLife();
        tabNewLife.push(life);
        // console.log("New Life", tabNewLife.length);
    }


}


function move_new_life() {

  tabNewLife.forEach(function (maLife, idl){

    maLife.move();


    let posX = maLife.x + maLife.newLife.offsetWidth / 2
    let posY = maLife.y + maLife.newLife.offsetHeight / 2
    // let posX = maLife.x // + maLife.newLife.offsetWidth / 2
    // let posY = maLife.y // + maLife.newLife.offsetHeight / 2

    console.log(maLife.x, maLife.y, posX, posY);

    if (posX >= player.x &&
        posY >= player.y &&
        posX <= player.x + player.player.offsetWidth &&
        posY <=  player.y + player.player.offsetHeight) {
        // console.log("Vie attrapée !")
        player.vie += 1;
        life.innerHTML = player.vie;
        maLife.sound();
        maLife.newLife.remove();
        tabNewLife.splice(idl, 1);
        lifeActive = true;
        
        }
   
    if (maLife.y >= game.clientHeight) {
        // console.log("La vie à dépassée l'ecran !")

        maLife.newLife.remove();
        // console.log("Supprime la div live !")
        tabNewLife.splice(idl, 1);
        // console.log("Tableau life", tabNewLife.length)
        lifeActive = true;

    }
    
  })

}


