import React, { useState } from 'react';
import Header from './Header'

function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <header>Contador: {counter}</header>
      <button onClick={() => setCounter(counter + 1)}>Incrementar</button>
    </div>
  )
}

export default App;
