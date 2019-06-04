import React from 'react'
import HistoryList from './HistoryList'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  let history = [{
    squares: Array(9).fill(null),
  }];
  shallow(<HistoryList
    history={history}
    jumpToMove={null}
  />)
  ;
});
