import React, {useState} from 'react';

interface Props {
  step?: number
}

export const Counter: React.FC<Props> = ({ step }) => {
  const [counter, setCounter] = useState(0);
  const realStep = step || 1;
  const handleClick = () => setCounter(counter + realStep);
  return (
    <div>
      <p>Counter: {counter}</p>
      <div>
        <button onClick={handleClick}>+{realStep}</button>
      </div>
    </div>
  );
};
