import { IDictionary, IRectangle } from './types';
import { MIN_COUNT, MAX_COUNT, MIN_BLOCK_SIZE, MAX_BLOCK_SIZE, CONTAINER_WIDTH, CONTAINER_HEIGHT } from './config';

const getRandomInt = (from: number, to: number) => {
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max + 1 - min)) + min; // Максимум и минимум включительно
}

const getRandomColor = () => `#${Math.floor(Math.random()*0xFFFFFF).toString(16)}`;

export const generateRandomRectangles = (count?: number): IDictionary<IRectangle> => {
  const length = count ?? Math.floor(Math.random() * (MAX_COUNT + 1 - MIN_COUNT)) + 1;
  const res: IDictionary<IRectangle> = {};

  for (let i = 1; i <= length; i++) {
    const width = getRandomInt(MIN_BLOCK_SIZE, MAX_BLOCK_SIZE);
    const height = getRandomInt(MIN_BLOCK_SIZE, MAX_BLOCK_SIZE);
    res[i] = {
      id: i,
      width,
      height,
      x: getRandomInt(0, CONTAINER_WIDTH - width),
      y: getRandomInt(0, CONTAINER_HEIGHT - height),
      color: getRandomColor(),
    };
  }

  return res;
};
