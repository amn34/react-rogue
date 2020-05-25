import Entity from "./Entity";

class Shopkeeper extends Entity{
    
    action(verb, world) {
        if(verb === 'bump') {
            let rand = this.attributes.num;
            if(rand === 0) {
                world.addToHistory(`You purchased ${world.player.attributes.gold} swords from Shopkeeper Kevin`);
                world.player.attributes.attack += world.player.attributes.gold;
                world.player.attributes.gold = 0;
            } else if(rand === 1) {
                world.addToHistory(`You purchased ${world.player.attributes.gold} armor from Shopkeeper Omri`);
                world.player.attributes.defense += world.player.attributes.gold;
                world.player.attributes.gold = 0;
            } else {
                world.addToHistory(`Shopkeeper Joey stole all your gold!`);
                world.player.attributes.gold = 0;
            }
            world.remove(this);
        }
    }

}

export default Shopkeeper;