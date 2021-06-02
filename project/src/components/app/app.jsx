import React from 'react';
import Main from '../main/main';

const cards = new Array(5).fill('').map((card) => card = {id: Math.random()}); // временная заглушка

function App() {
  return (
    <Main
      cards = {cards}
    />
  );
}

export default App;
