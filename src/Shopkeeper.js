import Entity from "./Entity";

class Shopkeeper extends Entity{
    
    action(verb, world) {
        if(verb === 'bump') {
            let rand = Math.floor(Math.random() * 3);
            let increase  = Math.floor(world.player.attributes.gold / 4);
            if(rand === 0) {
                world.addToHistory(`You purchased ${increase} swords from Shopkeeper Kevin`);
                world.player.attributes.attack += increase;
            } else if(rand === 1) {
                world.addToHistory(`You purchased ${increase} armor from Shopkeeper Omri`);
                world.player.attributes.defense += increase;
            } else {
                world.addToHistory(`Shopkeeper Joey stole all your gold!`);
            }
            world.player.attributes.gold = 0;
            world.remove(this);
        }
    }

}

export default Shopkeeper;