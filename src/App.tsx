import './App.css';
import { trafficLightMachine } from './stateMachines/trafficLightMachine';
import { useMachine } from '@xstate/react';

import TrafficLight from './components/TrafficLight';

const App: React.FC = () => {
  const [current, send] = useMachine(trafficLightMachine);
  const status = {
    currentColor: '',
    nextColor: '',
  };

  if (current.matches('red')) {
    status.currentColor = 'red';
    status.nextColor = 'green';
  } else if (current.matches('green')) {
    status.currentColor = 'green';
    status.nextColor = 'yellow';
  } else if (current.matches('yellow')) {
    status.currentColor = 'yellow';
    status.nextColor = 'red';
  } else {
    status.currentColor = '';
    status.nextColor = '';
  }

  return (
    <div className="App">
      <div>
        <TrafficLight
          redOn={current.value === 'red'}
          greenOn={current.value === 'green'}
          yellowOn={current.value === 'yellow'}
        />
      </div>
      <div>
        <button onClick={() => send({ type: 'CHANGE' })}>
          Change to
          {` ${status.nextColor}`}
        </button>
      </div>
      <div>
        <button onClick={() => send('BROKE')}>Brake Light</button>
      </div>
    </div>
  );
};

export default App;
