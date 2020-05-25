import Entity from "./Entity";

class Monster extends Entity {
    action(verb, world) {
        if(verb === 'bump') {
            //attack 
            let damage = world.player.attributes.attack - this.attributes.defense;
            if(damage > 0) {
                this.attributes.health -= damage;
                world.addToHistory(`Player attacks ${this.attributes.name} for ${damage} damage!`);
            } else {
                world.addToHistory(`You dealt no damage to ${this.attributes.name}`);
            }
            if(this.attributes.health <= 0) { //monster dies
                world.addToHistory(`${this.attributes.name} dies!`);
                world.addToHistory('You collected 1 gold');
                world.player.attributes.gold += 1;
                world.remove(this);
            } else { //monster lives and counterattacks
                world.addToHistory(`${this.attributes.name}'s has ${this.attributes.health} health`);
                this.attackPlayer(world);
                if(world.player.attributes.health <= 0) {
                    world.addToHistory(`You have died!`); 
                } 
            }
        }
    }

    attackPlayer(world) {
        let damage = this.attributes.attack - world.player.attributes.defense;
        if(damage > 0) {
            world.player.attributes.health -= damage;
            world.addToHistory(`You were attacked by ${this.attributes.name} for ${damage} damage`);
            world.addToHistory(`You have ${world.player.attributes.health} health left`);
        } else {
            world.addToHistory('The monster did no damage');
        }
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    copyMonster() {
        let newMonster = new Monster();
        Object.assign(newMonster, this);
        return newMonster;
    }


}

export default Monster;
