import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";




class Spawner {
    
    constructor(world) {
        this.world = world;
        this.MonsterTable = [
            {type: 'monster', name: 'Ogre', color: 'lightgrey', ascii: 'O', offset: {x: 2, y: 3}, health: 6, attack: 2, defense: 0},
            {type: 'monster', name: 'Snake', color: 'green', ascii: 'S', offset: {x: 2, y: 3}, health: 3, attack: 2, defense: 0},
            {type: 'monster', name: 'Rat', color: 'darkgrey', ascii: 'R', offset: {x: 2, y: 3}, health: 2, attack: 1, defense: 0},
            {type: 'monster', name: 'Penguin', color: 'blue', ascii: 'P', offset: {x: 2, y: 3}, health: 10, attack: 3, defense: 0},
        ];
        
        this.lootTable = [
            {type: 'item', name: 'Sword', color: 'darkgrey', ascii: '/', offset: {x: 6, y: 3}},
            {type: 'item', name: 'Potion', color: 'red', ascii: '!', offset: {x: 6, y: 3}},
            {type: 'item', name: 'Gold', color: 'yellow', ascii: '$', offset: {x: 3, y: 3}},
            {type: 'item', name: 'Armor', color: 'lightgrey', ascii: '#', offset: {x: 4, y: 3}}  
        ];
    }

    spawn(spawnCount, createEntity) {
        for(let count = 0; count < spawnCount; count++) {
            let entity = createEntity();
            this.world.add(entity);
            this.world.moveToSpace(entity);
        }
    };

    spawnLoot(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Loot(
                getRandomInt(this.world.width - 1),
                getRandomInt(this.world.height - 1),
                this.world.tileSize,
                this.lootTable[getRandomInt(this.lootTable.length)]);
        });
    }

    spawnMonsters(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Monster(
                getRandomInt(this.world.width - 1),
                getRandomInt(this.world.height - 1),
                this.world.tileSize,
                this.MonsterTable[getRandomInt(this.lootTable.length)]);
        });
    }

    spawnStairs() {
        let stairs = new Stairs(this.world.width - 10,
             this.world.height - 10, this.world.tileSize);
        this.world.add(stairs);
        this.world.moveToSpace(stairs);
    }


}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
