import React from 'react'
import HistoryListItem from './HistoryListItem'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<HistoryListItem
    onClick={null}
    desc={'button'}
  />)
  ;
});
