import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Summary from '../../components/Summary.jsx'
import BookSummary from '../../components/BookSummary.jsx'
configure({ adapter: new Adapter() });

describe('Summary component', () => {
  it("should render BookSummary", () => {
  const wrapper = shallow(<Summary summaries={['summary']} />);
  const summary = wrapper.find(BookSummary);
  expect(summary.exists()).toBe(true);
});

it('should render one div', () => {
  const wrapper = shallow(<Summary summaries={['summary']} />);
  expect(wrapper.find('div').length).toEqual(1);
});

const summaries = [
  {
    "_id": "608b721f197222ffe5e1561b",
    "id": 10,
    "__v": 0,
    "copyright": "©2017 ad nostrud sint (P)2020 minim qui ex",
    "short_summary": "Tempor ad cupidatat sint ad laboris dolore fugiat fugiat excepteur.",
    "summary": "Sint in proident dolore do cupidatat sint sunt consequat adipisicing Lorem reprehenderit mollit commodo."
  }
];
it('should render the state correctly', () => {
  const wrapper = shallow(<Summary summaries={summaries}/>)
  expect(wrapper).toMatchSnapshot();

});
});


