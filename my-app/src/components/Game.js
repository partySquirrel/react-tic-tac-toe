import React from 'react';

import Board from './Board';
import HistoryList from "./HistoryList";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.isGameOver(squares, i)) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  isGameOver(squares, i) {
    return calculateWinner(squares).winner || squares[i] || this.isTie(this.state.stepNumber);
  }

  isTie(stepNumber) {
    return stepNumber > 8;
  }

  jumpTo(step) {
    this.setState(
      {
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      }
    );
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const result = calculateWinner(current.squares);
    let status = this.getStatus(result);


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningLine={result.winningLine}
            gameOver={result.winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>

          <HistoryList
            history={history}
            jumpToMove={(move) => this.jumpTo(move)}
          />
        </div>
      </div>
    );
  }

  getStatus(result) {
    if (result.winner) {
      return 'Winner is: ' + result.winner;
    } else if (this.isTie(this.state.stepNumber)) {
      return 'It\'s a draw!';
    }

    return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  }
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
      return ({
        winner: squares[a],
        winningLine: lines[i],
      });
    }
  }
  return ({
    winner: null,
    winningLine: [],
  });
}

export default Game;
