import Entity from "../Entity.js";
import Combat from "../Combat.js";

class Monster extends Entity {
    action(verb, world) {
        if(verb === 'bump') {
            //attack 
            Combat.attack(world.player, this, world);
            if(this.attributes.health > 0) { //monster lives and counterattacks
                Combat.attack(this, world.player, world);
            }
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
