class Combat {

    static attack(attacker, defender, world) {
        
        let damage = attacker.attributes.attack - defender.attributes.defense;
        if(damage > 0) {
            defender.attributes.health -= damage;
            world.addToHistory(`${attacker.attributes.name} attacks ${defender.attributes.name} for ${damage} damage`);
            if(defender.attributes.health <= 0) {
                world.addToHistory(`${defender.attributes.name} has died!`)
                if(defender.attributes.type === 'monster') { 
                    world.addToHistory(`You collected ${defender.attributes.reward} gold`);
                    world.player.attributes.gold += defender.attributes.reward;
                    world.remove(defender);
                }
            }
        } else {
            world.addToHistory(`${attacker.attributes.name} dealt no damage to ${defender.attributes.name}`);
        }
    }

    

}

export default Combat