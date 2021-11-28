import { createMachine, assign, EventObject } from 'xstate';

type TrafficLightContext = {
  nextColor: string;
};

type TrafficLightStates = 'red' | 'yellow' | 'green' | 'broken';

type TrafficLightTypeState = {
  value: TrafficLightStates;
  context: TrafficLightContext;
};

const DEFAULT_CONTEXT: TrafficLightContext = {
  nextColor: 'green',
};

type TrafficLightEvent = {
  type: 'CHANGE';
};

export const trafficLightMachine = createMachine<
  TrafficLightContext,
  TrafficLightSchema,
  TrafficLightEvent
>({
  id: 'trafficLight',
  initial: 'red',
  context: {
    currentColor: 'red',
    nextColor: 'green',
  },
  states: {
    red: {
      on: {
        CHANGE: {
          target: 'green',
        },
        BROKE: { target: 'broken' },
      },
    },
    green: {
      on: {
        CHANGE: { target: 'yellow' },
        BROKE: { target: 'broken' },
      },
    },
    yellow: {
      on: {
        CHANGE: { target: 'red' },
        BROKE: { target: 'broken' },
      },
    },
    broken: {
      type: 'final',
    },
  },
});
