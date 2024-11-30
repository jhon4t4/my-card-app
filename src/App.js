// src/App.js
import React from 'react';
import Card from './Card'; // Importação correta

function App() {
  const cardId = "123"; // ID único para o card (pode ser gerado de acordo com o seu banco de dados)
  return (
    <div>
      <h1>Cards</h1>
      <Card 
        cardId={cardId} 
        title="Meu Primeiro Card" 
        description="Este é um exemplo!" 
      />
    </div>
  );
}

export default App;


