import React,{useEffect, useState} from 'react';
import InputManager from './InputManager.js';
import World from './World.js';
import Spawner  from './Spawner.js';

const ReactRouge  = ({width, height, tileSize}) => { 
    const canvasRef = React.useRef(null);
    const[world, setWorld] = useState(new World(width, height, tileSize)); 
    let inputManager = new InputManager();

    const handleInput = (action, data) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`);
        let newWorld = new World();
        Object.assign(newWorld, world); //deep copy?
        newWorld.movePlayer(data.x, data.y);
        newWorld.moveMonsters(world);
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
    <div style = {{display: 'flex'}}>
        <ul style = {{padding: '20px'}}>
            <li style = {{display: 'inline-center'}}> Log: </li>
            <li> -------------------------------</li>
            {world.history.map((item, index) => (<li key = {index}>{item}</li>))} 
        </ul>
        <canvas 
            ref = {canvasRef}
            width = {width * tileSize}  
            height = {height * tileSize}
            style = {{border: '1px solid black', background: 'DimGray', display: 'block'}}
        ></canvas> 
        <ul style = {{listStyle: 'none'}}>
            <h1> B{world.level}</h1>
            <li> Health: {world.player.attributes.health} / {world.player.attributes.maxHealth}</li>
            <li> Attack: {world.player.attributes.attack}</li>
            <li> Defense: {world.player.attributes.defense}</li>
            <li> Gold: {world.player.attributes.gold}</li>
        </ul>
    </div>
)};

export default ReactRouge;