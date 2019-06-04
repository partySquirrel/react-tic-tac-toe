import React from 'react'
import Square from './Square'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<Square
    winningItem={false}
    onClick={null}
    gameOver={false}
    disabled={false}
    value={'X'}
  />)
  ;
});

