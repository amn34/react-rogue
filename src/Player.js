import Entity from "./Entity";

class Player extends Entity{

    inventory = []; //list of items


    attributes = {
        name: 'Player',
        ascii: '@',
        health: 10,
    }

    move(dx, dy) {
        //if the player is dead it can't move
        if(this.attributes.health <= 0) return; 

        //otherwise move
        this.x += dx;
        this.y += dy;
    }

    add(item) {
        this.inventory.push(item);
        
    }


    copyPlayer() {
        let newPlayer = new Player();
        Object.assign(newPlayer, this);
        return newPlayer;
    }
}
export default Player;