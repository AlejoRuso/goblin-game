import './style.css';
import { Game } from './Game.js';
import { Board } from './Board.js';

document.addEventListener('DOMContentLoaded', () => {
  const board = new Board('gameBoard');
  const game = new Game(board);
  game.start();
});