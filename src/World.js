import { Map } from 'rot-js';
import Player from './Entities/Player';
import Combat from './Combat';

class World {

    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.entities = [new Player(0,0,16)];
        this.level = 0;
        this.history = [];


        this.worldmap = new Array(this.width);
        for (let x = 0; x< this.width; x++) {
            this.worldmap[x] = new Array(this.height);
        }
    }

    get player() {
        return this.entities[0];
    }

    add(entity) {
        this.entities.push(entity);
    }

    remove(entity) {
        this.entities = this.entities.filter(e => e !== entity);
    }

    //if the entity is spawned in the wall move it until it reaches a 
    //free space 
    moveToSpace(entity) {
        for(let x = entity.x; x < this.width; x++) {
            for(let y = entity.y; y < this.height; y++) {
                if(this.worldmap[x][y] === 0 && !this.getEntityAtLocation(x,y)) {
                    entity.x = x;
                    entity.y = y;
                    return;
                }
            }
        }
    }

    //returns if the square the player is moving to is a invalid square
    isWall(x, y) {
        return (this.worldmap[x] === undefined ||
             this.worldmap[y] === undefined ||
             this.worldmap[x][y] === 1);
    } 

    getEntityAtLocation(x,y) {
        return this.entities.find(entity => entity.x === x && entity.y === y);
    }

    movePlayer(dx, dy) {
        let tempPlayer = this.player.copyPlayer();
        tempPlayer.move(dx,dy);
        let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
        if(entity) { //if there is another entity then interact with it
            entity.action('bump', this);
            return;
        }
        if (!this.isWall(tempPlayer.x, tempPlayer.y)) { //if free space then move player
            this.player.move(dx,dy);
        }
    }

    moveMonsters(world) {
        this.entities.filter(entity => entity.attributes.type === 'monster').forEach(monster => {
            let tempMonster = monster.copyMonster();
            let vector = this.chooseMonsterDirection();
            let dx = vector.x;
            let dy = vector.y;
            tempMonster.move(dx,dy);
            let entity = this.getEntityAtLocation(tempMonster.x, tempMonster.y);
            if(entity === this.player) {
                Combat.attack(tempMonster, this.player, world);
                return;
            } else if (entity) {
                return;
            }
            if(!this.isWall(tempMonster.x, tempMonster.y)) {
                monster.move(dx,dy)
            }
        });
    }

    chooseMonsterDirection() {
        let rand = Math.floor(Math.random() * 4) + 1;
        if(rand === 1) return {x:1,y:0};
        if(rand === 2) return {x:-1,y:0};
        if(rand === 3) return {x:0,y:1};
        if(rand === 4) return {x:0,y:-1};
    }


    createCellularMap() {
        var map = new Map.Cellular(this.width, this.height, { connected:true });
        map.randomize(0.5);
        var userCallback = (x, y, value) => {
            if(x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
                this.worldmap[x][y] = 1; //create walls around the edges of the map
                return;
            }
            this.worldmap[x][y] = value === 0 ? 1: 0;
        };
        map.create(userCallback);
        map.connect(userCallback, 1);
    }

    draw(context) {
        //draws the map
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                if(this.worldmap[x][y] === 1) this.drawWall(context, x, y);
            }
        }

        //draws the entities in the game
        this.entities.forEach(entity => {
            entity.draw(context);
        }); 

    }

    drawWall(context, x, y) {
        context.fillStyle = '#000';
        context.fillRect(x * this.tileSize, y * this.tileSize,
             this.tileSize, this.tileSize);
    }

    addToHistory(history) {
        this.history.push(history);
        //keeps the history from getting to long
        if(this.history.length > 6) this.history.shift();
    }


}

export default World;