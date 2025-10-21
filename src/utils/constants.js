export const ROWS = 15;
export const COLUMNS = 15;

export const GAME_DIFFICULTY_LEVEL = {
  easy: 3000,
  medium: 1500,
  hard: 500,
};

export const ARROW_UP = "ArrowUp";
export const ARROW_DOWN = "ArrowDown";
export const ARROW_RIGHT = "ArrowRight";
export const ARROW_LEFT = "ArrowLeft";

export const DIRECTIONS = {
  [ARROW_UP]: [0, -1],
  [ARROW_DOWN]: [0, 1],
  [ARROW_RIGHT]: [1, 0],
  [ARROW_LEFT]: [-1, 0],
};

export const SNAKE_STARTING_POINT = [[2, 3]];
