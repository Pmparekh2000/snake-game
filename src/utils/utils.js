import { COLUMNS, ROWS } from "./constants";

export const getGameGrid = (rows, columns) => {
  return Array.from({ length: rows }, () => {
    return new Array(columns).fill("");
  });
};

export const getRandomFoodCoordinate = () => {
  let xCoordinate = Math.floor(Math.random() * (COLUMNS - 1));
  let yCoordinate = Math.floor(Math.random() * (ROWS - 1));
  return [xCoordinate, yCoordinate];
};

export const isSnakeBodyDiv = (snakeBody, xCoordinate, yCoordinate) => {
  return snakeBody?.some(([xCoord, yCoord]) => {
    return xCoord === xCoordinate && yCoord === yCoordinate;
  });
};
