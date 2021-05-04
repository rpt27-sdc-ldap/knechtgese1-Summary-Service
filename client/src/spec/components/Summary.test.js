import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Summary from '../../components/Summary.jsx'
import BookSummary from '../../components/BookSummary.jsx'
configure({ adapter: new Adapter() });

describe('Summary', () => {
  it("should render BookSummary", () => {
  const wrapper = shallow(<Summary summaries={['summary']} />);
  const summary = wrapper.find(BookSummary);
  expect(summary.exists()).toBe(true);
});

it('Summary renders div', () => {
  const wrapper = shallow(<Summary summaries={['summary']} />);
  expect(wrapper.find('div').length).toEqual(1);
});

// it('displays summaries if passed props', () => {
//   const wrapper = shallow(<Summary summaries={['summary']} />);
//   expect(wrapper.find('BookSummary').exists()).toEqual(true);
// });

it('should render the state', () => {
  const wrapper = shallow(<Summary summaries={['summary']} />)
  const result = wrapper.find('div').text();
  expect(result).toEqual("<BookSummary />");

});
});


