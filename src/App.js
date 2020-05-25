import React from 'react';
import ReactRouge from './ReactRouge.js';

//function that returns jsx
const App = () => (
<div className="App"> 
  {/* Passing props into the react component*/}
  <ReactRouge width = {40} height = {40} tileSize = {16}/>
</div>
);


export default App;
