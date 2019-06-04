import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const className = 'square' + (props.winningItem ? ' winning' : '');
  return (
    <button
      onClick={props.onClick}
      className={className}
      disabled={props.disabled || props.gameOver}
    >
      {props.value}
    </button>
  );
}

function HistoryListItem(props) {
  return (
    <li>
      <button onClick={props.onClick}>
        {props.desc}
      </button>
    </li>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winningItem={this.props.winningLine.includes(i)}
        disabled={this.props.squares[i] || this.props.gameOver}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

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
    return calculateWinner(squares).winner || squares[i] || isTie(this.state.stepNumber);
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

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move # ' + move : 'Go to game start';
      return (
        <HistoryListItem
          key={move}
          desc={desc}
          onClick={() => this.jumpTo(move)}
        />
      )
    });

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
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  getStatus(result) {
    if (result.winner) {
      return 'Winner is: ' + result.winner;
    } else if (isTie(this.state.stepNumber)) {
      return 'It\'s a draw!';
    }

    return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  }
}

function isTie(stepNumber) {
  return stepNumber > 8;
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


// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

