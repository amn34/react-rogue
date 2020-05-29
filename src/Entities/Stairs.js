import Entity from "./Entity";
import Spawner from "./Spawner";


class Stairs extends Entity {

    attributes = {
        name: 'Stair',
        color: 'white',
         ascii: '>',
         offset: { x: 2, y: 2 }
    };

    action(verb, world) {
        if(verb === 'bump') {
            //moves down to the next floor
            world.level += 1;
            world.addToHistory('You move down the stairs...');
            world.addToHistory(`You have entered B${world.level}`);
            world.createCellularMap();
            world.player.x = 0;
            world.player.y = 0;
            world.moveToSpace(world.player);
            //clears out the previous map
            world.entities = world.entities.filter(e => e === world.player);
            let spawner = new Spawner(world);
            spawner.spawnLoot(10);
            spawner.spawnMonsters(6);
            spawner.spawnStairs();
            spawner.spawnShopKeeper();
        }
    }


}


export default Stairs;