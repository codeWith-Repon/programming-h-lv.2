import type { CSSProperties } from 'react';
import { decrement, increment } from './redux/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from './redux/hook';

function App() {
  const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    flexDirection: 'column',
    gap: '10px',
  };

  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.counter);

  const handleIncrement = (amount: number) => {
    dispatch(increment(amount));
  };

  const handleDicrement = () => {
    dispatch(decrement());
  };

  return (
    <div style={containerStyle}>
      <h1>Counter with redux</h1>

      <button
        onClick={() => handleIncrement(5)}
        style={{ fontSize: '18px', padding: '10px 20px' }}
      >
        Incriment by 5
      </button>
      <button
        onClick={() => handleIncrement(1)}
        style={{ fontSize: '18px', padding: '10px 20px' }}
      >
        Incriment
      </button>
      <div style={{ fontSize: '2rem' }}>{count}</div>
      <button
        onClick={handleDicrement}
        style={{ fontSize: '18px', padding: '10px 20px' }}
      >
        Decrement
      </button>
    </div>
  );
}

export default App;
