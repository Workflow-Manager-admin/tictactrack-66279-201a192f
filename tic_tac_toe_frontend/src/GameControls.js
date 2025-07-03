import React from "react";

/**
 * GameControls Component
 * PUBLIC_INTERFACE
 * Renders game control buttons.
 * Props:
 *   onNewGame: function to start a new game
 *   onReset: function to reset current board
 *   onEndGame: function to end game or leave board
 *   isActive: whether a game is currently active
 */
function GameControls({ onNewGame, onReset, onEndGame, isActive }) {
  return (
    <div className="ttt-controls">
      <button className="ttt-btn primary" onClick={onNewGame} disabled={isActive}>
        New Game
      </button>
      <button className="ttt-btn secondary" onClick={onReset} disabled={!isActive}>
        Reset Board
      </button>
      <button className="ttt-btn accent" onClick={onEndGame} disabled={!isActive}>
        End Game
      </button>
    </div>
  );
}

export default GameControls;
