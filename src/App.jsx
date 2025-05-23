import { useState } from "react";

function Square({ value, onSquareCLick }) {
  return (
    <button
      onClick={onSquareCLick}
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareCLick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareCLick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareCLick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareCLick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareCLick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareCLick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareCLick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareCLick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareCLick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className="w-auto bg-amber-100 border-2 border-amber-500 p-1 m-1"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
