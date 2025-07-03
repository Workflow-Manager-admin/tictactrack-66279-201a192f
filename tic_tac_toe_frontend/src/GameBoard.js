import React from "react";
import "./GameBoard.css";

/**
 * GameBoard Component
 * PUBLIC_INTERFACE
 * Renders a 3x3 Tic Tac Toe board.
 * Props:
 *   board: 2D array (3x3) of 'X', 'O', or null
 *   onCellClick: function(row, col) called when a cell is clicked
 *   disabled: if true, all cells are disabled
 */
function GameBoard({ board, onCellClick, disabled }) {
  return (
    <div className="ttt-board">
      {board.map((row, rowIdx) =>
        <div key={rowIdx} className="ttt-board-row">
          {row.map((cell, colIdx) =>
            <button
              key={colIdx}
              className={`ttt-cell${cell ? " filled" : ""}`}
              disabled={disabled || !!cell}
              onClick={() => onCellClick(rowIdx, colIdx)}
              aria-label={`Cell ${rowIdx * 3 + colIdx + 1}`}
              tabIndex={0}
            >
              {cell}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default GameBoard;
