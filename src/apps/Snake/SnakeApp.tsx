import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import axios from 'axios';
import { Play, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 100;

export const SnakeApp: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchHighScore();
  }, []);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, snake, direction]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const fetchHighScore = async () => {
    try {
      const res = await axios.get('/api/highscore');
      setHighScore(res.data.highscore);
    } catch (e) {
      console.error('Failed to fetch high score');
    }
  };

  const saveHighScore = async (newScore: number) => {
    if (newScore > highScore) {
      try {
        await axios.post('/api/highscore', { score: newScore });
        setHighScore(newScore);
      } catch (e) {
        console.error('Failed to save high score');
      }
    }
  };

  const moveSnake = () => {
    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    // Check collisions
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE ||
      snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setGameOver(true);
      setIsPlaying(false);
      saveHighScore(score);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Check food
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(score + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  };

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    generateFood();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#2C2C2C] text-white p-4">
      <div className="mb-4 flex justify-between w-full max-w-[400px]">
        <div className="text-xl font-bold text-[#E95420]">Score: {score}</div>
        <div className="text-xl font-bold text-yellow-500">High Score: {highScore}</div>
      </div>

      <div 
        className="relative bg-black border-4 border-[#3E3E3E] shadow-2xl"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500 border border-black"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              borderRadius: index === 0 ? '4px' : '0',
            }}
          />
        ))}
        <div
          className="absolute bg-red-500 rounded-full animate-pulse"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
        
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-red-500 mb-4">GAME OVER</div>
            <button
              onClick={startGame}
              className="flex items-center space-x-2 bg-[#E95420] hover:bg-[#C74215] text-white px-6 py-3 rounded-full font-bold transition-transform hover:scale-105"
            >
              <RotateCcw size={20} />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <button
              onClick={startGame}
              className="flex items-center space-x-2 bg-[#E95420] hover:bg-[#C74215] text-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 shadow-lg"
            >
              <Play size={24} />
              <span>Start Game</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-gray-400 text-sm">
        Use <span className="text-white font-bold border border-white/20 px-1 rounded">Arrow Keys</span> to move
      </div>
    </div>
  );
};
