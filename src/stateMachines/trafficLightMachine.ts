import { createMachine, assign } from 'xstate';

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
  type: 'CHANGE' | 'BROKE';
};

const ACTIONS = {
  assignNextColor: () =>
    assign<TrafficLightContext, TrafficLightEvent>((ctx) => {
      switch (ctx.nextColor) {
        case 'red':
          return { nextColor: 'green' };
        case 'green':
          return { nextColor: 'yellow' };
        case 'yellow':
          return { nextColor: 'red' };
        default:
          return { nextColor: 'broken' };
      }
    }),
};

export const trafficLightMachine = createMachine<
  TrafficLightContext,
  TrafficLightEvent,
  TrafficLightTypeState
>(
  {
    id: 'trafficLight',
    strict: true,
    initial: 'red',
    context: DEFAULT_CONTEXT,
    states: {
      red: {
        on: {
          CHANGE: {
            target: 'green',
            actions: ['assignNextColor'],
          },
          BROKE: { target: 'broken' },
        },
      },
      green: {
        on: {
          CHANGE: {
            target: 'yellow',
            actions: ['assignNextColor'],
          },
          BROKE: { target: 'broken' },
        },
      },
      yellow: {
        on: {
          CHANGE: {
            target: 'red',
            actions: ['assignNextColor'],
          },
          BROKE: { target: 'broken' },
        },
      },
      broken: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      assignNextColor: ACTIONS.assignNextColor,
    },
  },
);
