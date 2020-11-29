import React, {useEffect, useState} from 'react';
import {Counter} from "./components/Counter";
import './App.css';
import {numbers$} from "./services/timer";

function App() {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const sub = numbers$.subscribe((value) => {
      console.log('number', value);
      setNumber(value);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {number}
        <Counter />
        <Counter step={2} />
      </header>
    </div>
  );
}

export default App;
