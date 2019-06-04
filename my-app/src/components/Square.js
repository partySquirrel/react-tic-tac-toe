import React from 'react';

class Square extends React.PureComponent {
  render() {
    const className = 'square' + (this.props.winningItem ? ' winning' : '');
    return (
      <button
        onClick={this.props.onClick}
        className={className}
        disabled={this.props.disabled || this.props.gameOver}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
