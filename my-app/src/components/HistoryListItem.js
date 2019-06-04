import React from 'react';

class HistoryListItem extends React.PureComponent {
  render() {
    return (
      <li>
        <button onClick={this.props.onClick}>
          {this.props.desc}
        </button>
      </li>
    );
  }
}

export default HistoryListItem;
