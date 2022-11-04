

const game = document.querySelector('#game');

export default class Etoile {

    constructor() {

        let etoile = document.createElement('div');
        etoile.classList.add('etoile');
        etoile.style.position = "absolute";
        etoile.style.borderRadius = "50%"
        let tailleEtoile = rand(4) / 10;
        etoile.style.width = tailleEtoile + "vw" ;
        etoile.style.height = tailleEtoile * 2 + "vh";
        let colorEtoile = 155 + rand(100);
        etoile.style.backgroundColor = `rgb(${colorEtoile}, ${colorEtoile}, ${colorEtoile} )`;
        let posX = rand(game.clientWidth - etoile.offsetWidth);
        let posY = rand(game.clientHeight - etoile.offsetHeight);

        console.log("Position etoile", posX, posY);

        etoile.style.left = posX + "px";
        etoile.style.top = posY + "px";
        
        game.appendChild(etoile);
        this.etoile = etoile;
        this.x = posX;
        this.y = posY;
        this.velocity = 2 + rand(2);
        
    }

    move() {
        this.y += this.velocity
        if (this.y >= game.clientHeight) {
            this.y = 0;
            this.x = rand(game.clientWidth - this.etoile.offsetWidth);
        }
        this.draw(); 
    }

    draw() {
        this.etoile.style.left = this.x + "px";
        this.etoile.style.top = this.y + "px";
    }


}

function rand(valeur) {

return Math.floor(Math.random() * valeur);

}