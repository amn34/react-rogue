import React,{useRef, useEffect, useState} from 'react';
import InputManager from './InputManager.js';
import World from './World.js';
import Spawner  from './Spawner.js';

const ReactRouge  = ({width, height, tileSize}) => { 
    const canvasRef = React.useRef(null);
    //passes back the intial state of the player and a method to change the player
    //const[player, setPlayer] = useState(new Player(1,2,tileSize));
    const[world, setWorld] = useState(new World(width, height, tileSize)); 
    let inputManager = new InputManager();
    const handleInput = (action, data) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`);
        let newWorld = new World();
        Object.assign(newWorld, world); //deep copy?
        newWorld.movePlayer(data.x, data.y);
        setWorld(newWorld);
    };

    useEffect(() => {
        console.log('Create map');
        let newWorld = new World();
        Object.assign(newWorld, world);
        newWorld.createCellularMap();
        newWorld.moveToSpace(world.player); //moves the player to a valid space
        let spawner = new Spawner(newWorld);
        spawner.spawnLoot(10);
        spawner.spawnMonsters(6);
        spawner.spawnStairs();
        setWorld(newWorld);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //prevents createmap from being called after every movement

    useEffect(() => {
        console.log('Bind input manager');
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);
        return () =>  {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        };
    });

    useEffect(() => {
        console.log("Draw to the canvas");
        const ctx  = canvasRef.current.getContext('2d');
        ctx.clearRect(0,0,width * tileSize, height * tileSize);
        world.draw(ctx, tileSize);
    });
    return (
    <>
    <canvas 
        ref = {canvasRef}
        width = {width * tileSize}  
        height = {height * tileSize}
        style = {{border: '1px solid black', background: 'DimGray'}}
    ></canvas> 
    <ul>
        {world.player.inventory.map((item, index) => (<li key = {index}>{item.attributes.name}</li>))} 
    </ul>
    <ul>
        {world.history.map((item, index) => (<li key = {index}>{item}</li>))} 
    </ul>
    </>
)};

export default ReactRouge;