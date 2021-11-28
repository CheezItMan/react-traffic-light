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
      {/* <button onClick={() => send('Toggle')}>{current.matches('green') ? 'yellow' : ''}{current.matches('yellow') ? 'red' : ''}{current.matches('red') ? 'green': 'yellow'}</button> */}
      <div>
        <TrafficLight
          redOn={current.value === 'red'}
          greenOn={current.value === 'green'}
          yellowOn={current.value === 'yellow'}
        />
      </div>
      <button onClick={() => send({ type: 'CHANGE', nextData: status })}>
        Change to
        {status.nextColor}
      </button>
    </div>
  );
};

export default App;
