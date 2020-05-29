import React,{useEffect, useState} from 'react';
import InputManager from './InputManager.js';
import World from './World.js';
import Spawner  from './Spawner.js';

const ReactRouge  = ({width, height, tileSize}) => { 


    const canvasRef = React.useRef(null);
    //update the world 
    const[world, setWorld] = useState(new World(width, height, tileSize)); 
    //handles user input
    let inputManager = new InputManager();

    //action for user input
    const handleInput = (action, data) => {
        let newWorld = new World();
        Object.assign(newWorld, world); //deep copy?
        newWorld.movePlayer(data.x, data.y);
        newWorld.moveMonsters(world);
        setWorld(newWorld);
    };

    //creates the map
    useEffect(() => {
        let newWorld = new World();
        Object.assign(newWorld, world);
        newWorld.createCellularMap();
        newWorld.moveToSpace(world.player); //moves the player to a open space
        let spawner = new Spawner(newWorld);
        spawner.spawnLoot(10);
        spawner.spawnMonsters(6);
        spawner.spawnStairs();
        setWorld(newWorld);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //prevents createmap from being called after every movement

    //draws the map
    useEffect(() => {
        const ctx  = canvasRef.current.getContext('2d');
        ctx.clearRect(0,0,width * tileSize, height * tileSize);
        world.draw(ctx, tileSize);
    });

    //adds key listener
    useEffect(() => {
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);
        return () =>  {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        };
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