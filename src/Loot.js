import Entity from "./Entity";

class Loot extends Entity {

    action(verb, world) {
        if(verb === 'bump') {
            console.log('Pickup', this);
            world.player.add(this, world);
            world.remove(this);
        }
        if(verb === 'drop') {
            console.log('drop', this);
        }
    }
}

export default Loot;