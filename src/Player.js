import Entity from "./Entity";

class Player extends Entity{

    attributes = {
        name: 'Player',
        ascii: '@',
        maxHealth: 10,
        health: 10,
        attack: 1,
        defense: 0,
        gold: 0
    }

    move(dx, dy) {
        //if the player is dead it can't move
        if(this.attributes.health <= 0) return; 

        //otherwise move
        this.x += dx;
        this.y += dy;
    }

    add(item, world) {
        
        let power = 1 + Math.floor(Math.random() * 2);
        if(item.attributes.name === 'Sword') {
            this.attributes.attack = this.attributes.attack + power;
        } else if(item.attributes.name === 'Armor') {
            this.attributes.defense += power;
        } else if(item.attributes.name === 'Gold') {
            this.attributes.gold += power;
        } else {
            //potion, heals and adds +1 maxhealth
            power += 4
            this.attributes.health += power;
            this.attributes.maxHealth += 1;
            //prevents the player from having more health than max health
            if(this.attributes.health > this.attributes.maxHealth) {
                this.attributes.health = this.attributes.maxHealth;
            }
        }

        world.addToHistory(`You have picked up ${item.attributes.name}`);
        world.addToHistory(`Power: ${power}`);
    }


    copyPlayer() {
        let newPlayer = new Player();
        Object.assign(newPlayer, this);
        return newPlayer;
    }
}
export default Player;