import { createMachine, assign, EventObject } from 'xstate';

type TrafficLightContext = {
  currentColor: 'green' | 'yellow' | 'red' | '';
  nextColor: 'green' | 'yellow' | 'red' | '';
};

type TrafficLightSchema = {
  states: {
    green: Record<string, unknown>;
    yellow: Record<string, unknown>;
    red: Record<string, unknown>;
    broken: Record<string, unknown>;
  };
};

const changeContext = assign<TrafficLightContext>({
  currentColor: (context) => {
    return {
      currentColor: context.nextColor,
      nextColor:
        context.nextColor === 'green'
          ? 'yellow'
          : context.nextColor === 'yellow'
          ? 'red'
          : 'green',
    };
  },
});

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
