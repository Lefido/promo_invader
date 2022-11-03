

const game = document.querySelector('#game');

export default class NewLife {

    constructor() {

        let newLife = document.createElement('div');
        newLife.classList.add('newLife');
        newLife.style.position = "absolute";
        newLife.style.width = "2.5vw" ;
        newLife.style.height = "5vh";
        // newLife.style.zIndex = "1000";
        newLife.backgroundColor = "red";
        newLife.style.background = 'url("./assets/life.png") 100%/100% no-repeat';
        
        let posX = Math.floor(Math.random() * game.clientWidth - newLife.offsetWidth);
        let posY = 50
        console.log("Position nouvelle life", posX, posY);
       newLife.style.left = posX + "px";
        newLife.style.top = posY + "px";
        
        game.appendChild(newLife);
        this.newLife = newLife;
        this.x = posX;
        this.y = posY;
        this.newSound = new Audio('./assets/life.mp3')
        
    }

    move() {
        this.y +=2
        this.draw(); 
    }

    draw() {
        this.newLife.style.left = this.x + "px";
        this.newLife.style.top = this.y + "px";
    }

    sound() {
        this.newSound.play();
    }




}