import React from "react";

/**
 * GameHistory Component
 * PUBLIC_INTERFACE
 * Shows a list of previous games (history).
 * Props:
 *   history: array of {id, date, winner, moves}
 *   onSelect: function(gameId) to inspect a game's moves
 */
function GameHistory({ history, onSelect }) {
  if (!history || history.length === 0) {
    return (
      <div className="ttt-history">
        <h3>Game History</h3>
        <div className="ttt-history-none">No games played yet.</div>
      </div>
    );
  }
  return (
    <div className="ttt-history">
      <h3>Game History</h3>
      <ul>
        {history.map(game => (
          <li key={game.id} className="ttt-history-item">
            <button onClick={() => onSelect(game.id)}>
              <span>{new Date(game.date).toLocaleString()}</span>
              <span>
                {game.winner
                  ? `Winner: ${game.winner}`
                  : "Draw"}
              </span>
              <span className="ttt-history-moves">{game.moves} moves</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistory;
