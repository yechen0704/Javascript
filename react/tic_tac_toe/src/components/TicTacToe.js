import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [status, setStatus] = useState('Current Player: X');

  const handleClick = (index) => {
    if (!board[index]) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (checkWinner(newBoard)) {
        setStatus(`Player ${currentPlayer} wins!`);
        setBoard(Array(9).fill(null));
      } else if (checkDraw(newBoard)) {
        setStatus('It\'s a draw!');
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setStatus(`Current Player: ${currentPlayer === 'X' ? 'O' : 'X'}`);
      }
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizon
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticle
      [0, 4, 8], [2, 4, 6]             // diagnol
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = (board) => {
    return board.every(cell => cell !== null);
  };

  // reset
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatus('Current Player: X');
  };

  // re-render
  const renderBoard = () => {
    return board.map((cell, index) => (
      <div key={index} className="cell" onClick={() => handleClick(index)}>
        {cell}
      </div>
    ));
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">{renderBoard()}</div>
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;