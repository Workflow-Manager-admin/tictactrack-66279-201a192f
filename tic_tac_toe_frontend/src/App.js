import React, { useState, useEffect } from 'react';
import './App.css';
import './GameBoard.css';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import GameControls from './GameControls';
import GameHistory from './GameHistory';

// Helper function for new empty board
const emptyBoard = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Utility to check for winner or draw
function calculateWinner(board) {
  const lines = [
    // Rows
    [ [0,0],[0,1],[0,2] ], [ [1,0],[1,1],[1,2] ], [ [2,0],[2,1],[2,2] ],
    // Columns
    [ [0,0],[1,0],[2,0] ], [ [0,1],[1,1],[2,1] ], [ [0,2],[1,2],[2,2] ],
    // Diagonals
    [ [0,0],[1,1],[2,2] ], [ [0,2],[1,1],[2,0] ],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return board[a[0]][a[1]];
    }
  }
  // Check for draw
  if (board.flat().every(cell => cell)) return 'Draw';
  return null;
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [board, setBoard] = useState(emptyBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [status, setStatus] = useState('Start a new game to play.');
  const [history, setHistory] = useState([]); // Array of {id, date, winner, moves}
  const [moveCount, setMoveCount] = useState(0);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Compute status and winner
  useEffect(() => {
    const winner = calculateWinner(board);
    if (!gameActive) {
      setStatus("Start a new game to play.");
    } else if (winner === 'Draw') {
      setStatus("It's a draw!");
    } else if (winner) {
      setStatus(`Winner: ${winner}`);
    } else {
      setStatus(`Next: ${xIsNext ? "X" : "O"}`);
    }
  }, [board, xIsNext, gameActive]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleCellClick = (row, col) => {
    if (!gameActive || board[row][col] || calculateWinner(board)) return;
    const newBoard = board.map(r => r.slice());
    newBoard[row][col] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setMoveCount(m => m + 1);
    setXIsNext(x => !x);

    const winner = calculateWinner(newBoard);
    if (winner || winner === 'Draw') {
      // Add to history
      setHistory(hist => [
        { id: Date.now(), date: new Date(), winner: winner === 'Draw' ? null : winner, moves: moveCount + 1 },
        ...hist
      ]);
      setGameActive(false);
    }
  };

  // PUBLIC_INTERFACE
  const startNewGame = () => {
    setBoard(emptyBoard());
    setXIsNext(true);
    setGameActive(true);
    setStatus("Next: X");
    setMoveCount(0);
  };

  // PUBLIC_INTERFACE
  const resetBoard = () => {
    setBoard(emptyBoard());
    setXIsNext(true);
    setGameActive(true);
    setStatus("Next: X");
    setMoveCount(0);
  };

  // PUBLIC_INTERFACE
  const endGame = () => {
    setGameActive(false);
    setStatus("Game ended.");
  };

  // PUBLIC_INTERFACE
  const selectHistoryGame = (gameId) => {
    // For the main UI, we just highlight in status
    const game = history.find(g => g.id === gameId);
    if (game) {
      setStatus(
        `History: Winner was ${game.winner ? game.winner : "Draw"} (${game.moves} moves)`
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header" style={{minHeight: "100vh", alignItems: "center", justifyContent: "center"}}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>
          <h1 style={{
            color: "var(--primary, #1976d2)",
            letterSpacing: "0.04em",
            fontWeight: 700,
            marginBottom: "1.2rem",
            fontSize: "2.3rem"
          }}>
            Tic Tac Toe
          </h1>
          <GameStatus status={status} />
          <GameControls
            onNewGame={startNewGame}
            onReset={resetBoard}
            onEndGame={endGame}
            isActive={gameActive}
          />
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={!gameActive || !!calculateWinner(board)}
          />
          <div style={{
            marginTop: "2.2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "2rem",
            width: "100%",
            flexWrap: "wrap"
          }}>
            <GameHistory history={history} onSelect={selectHistoryGame} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
