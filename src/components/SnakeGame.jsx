import React, { useEffect, useRef, useState } from "react";
import {
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  COLUMNS,
  DIRECTIONS,
  GAME_DIFFICULTY_LEVEL,
  ROWS,
  SNAKE_STARTING_POINT,
} from "../utils/constants";
import {
  getGameGrid,
  getRandomFoodCoordinate,
  isSnakeBodyDiv,
} from "../utils/utils";

const SnakeGame = ({ level = "easy" }) => {
  const [snakeGameGrid, setSnakeGameGrid] = useState(() =>
    getGameGrid(ROWS, COLUMNS)
  );
  const [snakeBody, setSnakeBody] = useState(SNAKE_STARTING_POINT);
  const foodRef = useRef(getRandomFoodCoordinate());
  const snakeRef = useRef(null);
  const directionRef = useRef(DIRECTIONS[ARROW_RIGHT]);

  const handleSnakeDirectionChange = (e) => {
    const { key } = e;
    if ([ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT].includes(key)) {
      if (
        (directionRef.current === DIRECTIONS[ARROW_UP] && key !== ARROW_DOWN) ||
        (directionRef.current === DIRECTIONS[ARROW_DOWN] && key !== ARROW_UP)
      ) {
        directionRef.current = DIRECTIONS[key];
      } else if (
        (directionRef.current === DIRECTIONS[ARROW_LEFT] &&
          key !== ARROW_RIGHT) ||
        (directionRef.current === DIRECTIONS[ARROW_RIGHT] && key !== ARROW_LEFT)
      ) {
        directionRef.current = DIRECTIONS[key];
      }
    }
  };

  const checkIfSnakeTouchedItself = (currentSnakeBody, newHead) => {
    return currentSnakeBody?.some((currentSnakeBodyCoordinates) => {
      return (
        currentSnakeBodyCoordinates[0] === newHead[0] &&
        currentSnakeBodyCoordinates[1] === newHead[1]
      );
    });
  };

  useEffect(() => {
    snakeRef.current = setInterval(() => {
      setSnakeBody((prevSnakeBody) => {
        const newHead = [
          prevSnakeBody[0][0] + directionRef.current[0],
          prevSnakeBody[0][1] + directionRef.current[1],
        ];
        if (
          newHead[0] === COLUMNS ||
          newHead[1] === ROWS ||
          newHead[0] < 0 ||
          newHead[1] < 0 ||
          checkIfSnakeTouchedItself(prevSnakeBody, newHead)
        ) {
          // resetting the direction of snake to be right the moment the snake touches the wall
          directionRef.current = DIRECTIONS[ARROW_RIGHT];
          // resetting the original position of snake the moment the snake touches the wall
          return [SNAKE_STARTING_POINT];
        }
        const copySnakeBody = prevSnakeBody?.map((row) => [...row]);
        if (
          newHead[0] === foodRef.current[0] &&
          newHead[1] === foodRef.current[1]
        ) {
          foodRef.current = getRandomFoodCoordinate();
        } else {
          copySnakeBody.pop();
        }
        copySnakeBody.unshift(newHead);
        return copySnakeBody;
      });
    }, [GAME_DIFFICULTY_LEVEL[level]]);

    window.addEventListener("keydown", handleSnakeDirectionChange);

    return () => {
      foodRef.current = null;
      snakeRef.current = null;
      directionRef.current = null;
      window.removeEventListener("keydown", handleSnakeDirectionChange);
    };
  }, []);

  return (
    <div>
      <>
        Snake Game
        <div
          className="container"
          style={{
            gridTemplateRows: `repeat(${ROWS}, 17px)`,
            gridTemplateColumns: `repeat(${COLUMNS}, 17px)`,
          }}
        >
          {snakeGameGrid?.map((row, rowIdx) => {
            return row?.map((cell, colIdx) => {
              return (
                <div
                  key={rowIdx + ", " + colIdx}
                  className={`cell ${
                    foodRef.current[0] === colIdx &&
                    foodRef.current[1] === rowIdx
                      ? "food"
                      : ""
                  }  ${
                    isSnakeBodyDiv(snakeBody, colIdx, rowIdx) ? "snake" : ""
                  } `}
                ></div>
              );
            });
          })}
        </div>
      </>
    </div>
  );
};

export default SnakeGame;
