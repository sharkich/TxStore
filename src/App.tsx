import React from 'react';
import './App.css';
import { Articles } from './components/Articles';
import { Counter } from './components/Counter';

function App() {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <Counter />
              <Counter step={2} />
            </td>
            <td>
              <Articles />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
