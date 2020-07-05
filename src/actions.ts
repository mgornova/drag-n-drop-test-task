import { action } from 'typesafe-actions';

export enum ActionTypes {
  generateBlocks = 'generate random blocks',
  setPosition = 'set new position of block',
  clear = 'clear all block',
}

export const generateBlocks = (count?: number) => action(ActionTypes.generateBlocks, { count });
export const setPosition = (id: string, position: { x: number; y: number }) => action(ActionTypes.setPosition, { id, position });
export const clear = () => action(ActionTypes.clear);

export type IActions = ReturnType<typeof generateBlocks>
  | ReturnType<typeof setPosition>
  | ReturnType<typeof clear>;
