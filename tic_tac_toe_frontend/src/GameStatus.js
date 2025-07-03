import React from "react";

/**
 * GameStatus Component
 * PUBLIC_INTERFACE
 * Shows game status: which player's turn, who won, or draw.
 * Props:
 *   status: string representing the current game status
 */
function GameStatus({ status }) {
  return (
    <div className="ttt-status">
      <span>{status}</span>
    </div>
  );
}

export default GameStatus;
