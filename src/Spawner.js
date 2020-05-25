import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";
import Shopkeeper from "./Shopkeeper";




class Spawner {
    
    constructor(world) {
        this.world = world;
        this.MonsterTable = [
            {type: 'monster', name: 'Ogre', color: 'lightgrey', ascii: 'O', offset: {x: 2, y: 3}, health: 5, attack: 2, defense: 0, reward: 3},
            {type: 'monster', name: 'Snake', color: 'lightgreen', ascii: 'S', offset: {x: 2, y: 3}, health: 3, attack: 2, defense: 0, reward: 2},
            {type: 'monster', name: 'Rat', color: 'darkgrey', ascii: 'R', offset: {x: 2, y: 3}, health: 2, attack: 1, defense: 0, reward: 1},
            {type: 'monster', name: 'Penguin', color: 'blue', ascii: 'P', offset: {x: 2, y: 3}, health: 10, attack: 3, defense: 0, reward: 6},
        ];
        
        this.lootTable = [
            {type: 'item', name: 'Sword', color: 'darkgrey', ascii: '/', offset: {x: 6, y: 3}},
            {type: 'item', name: 'Potion', color: 'red', ascii: '!', offset: {x: 6, y: 3}},
            {type: 'item', name: 'Gold', color: 'yellow', ascii: '$', offset: {x: 3, y: 3}},
            {type: 'item', name: 'Armor', color: 'lightgrey', ascii: '#', offset: {x: 4, y: 3}}  
        ];

        this.shopTable = [
            {type: 'shopkeeper', name: 'Kevin', ascii: 'Q', offset: {x:2, y:3}, num: 0},
            {type: 'shopkeeper', name: 'Omri', ascii: 'Q', offset: {x:2, y:3}, num: 1},
            {type: 'shopkeeper', name: 'Joey', ascii: 'Q', offset: {x:2, y:3}, num: 2},
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

    spawnShopKeeper() {
        this.spawn(1, () => {
            return new Shopkeeper(
                getRandomInt(this.world.width - 1),
                getRandomInt(this.world.height - 1),
                this.world.tileSize,
                this.shopTable[getRandomInt(this.shopTable.length)]);
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
