import React from 'react';
import HistoryListItem from './HistoryListItem';

class HistoryList extends React.PureComponent {
  render() {
    const moves = this.props.history.map((step, move) => {
      const desc = move ? 'Go to move # ' + move : 'Go to game start';
      return (
        <HistoryListItem
          key={move}
          desc={desc}
          onClick={() => this.props.jumpToMove(move)}
        />
      )
    });

    return (
      <ol>{moves}</ol>
    );
  }
}

export default HistoryList;
