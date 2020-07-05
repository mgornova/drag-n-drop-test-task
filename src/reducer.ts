import { ActionTypes, IActions } from './actions';
import { generateRandomRectangles } from './helpers';
import { IDictionary, IRectangle } from './types';
import { CONTAINER_WIDTH, CONTAINER_HEIGHT } from './config';

export interface IState {
  container: {
    width: number;
    height: number;
  };
  blocks: IDictionary<IRectangle>;
}

export const initialState: IState = {
  container: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
  },
  blocks: {},
};

export const reducer = (state: IState = initialState, action: IActions): IState => {
  switch (action.type) {
    case ActionTypes.setPosition: {
      return {
        ...state,
        blocks: {
          ...state.blocks,
          [action.payload.id]: {
            ...state.blocks[action.payload.id],
            x: action.payload.position.x,
            y: action.payload.position.y,
          }
        }
      }
    }
    case ActionTypes.generateBlocks: {
      return {
        ...state,
        blocks: generateRandomRectangles(action.payload.count),
      }
    }
    case ActionTypes.clear: {
      return initialState;
    }
    default:
      return state;
  }
};