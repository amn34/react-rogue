class Combat {

    static(attacker, defender, world) {
        
        let damage = attacker.attributes.attacker - defender.attributes.defense;
        if(damage > 0) {
            defender.attributes.health -= damage;
            world.addToHistory(`${attacker.attributes.name} attacks ${defender.attributes.name} for ${damage} damage!`);
        } else {
            world.addToHistory(`${attacker.attributes.name} dealt no damage to ${defender.attributes.name}`);
        }
        
    }
}