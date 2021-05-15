import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BookSummary from '../../components/BookSummary.jsx'
configure({ adapter: new Adapter() });

it('should render Publisher\'s summary heading', () => {
  const summary = {
    "id": 10,
    "__v": 0,
    "copyright": "©2017 ad nostrud sint (P)2020 minim qui ex",
    "short_summary": "this is a short summary",
    "summary": "this is summary"
}
  const wrapper = shallow(<BookSummary summary={summary} key={"10"}/>);
  const h2 = wrapper.find('h2');
  const result = h2.text();
  expect(result).toBe("Publisher's Summary");
});

it('should render Publisher\'s summary information', () => {
  const summary = {
    "id": 10,
    "__v": 0,
    "copyright": "©2017 ad nostrud sint (P)2020 minim qui ex",
    "short_summary": "this is a short summary",
    "summary": "this is summary"
}
  const wrapper = shallow(<BookSummary summary={summary} key={"10"}/>);
  const summarySpan = wrapper.find('span.normal')
  const summaryResult = summarySpan.text();
  expect(summaryResult).toBe("this is summary");

})

it('should render Publisher\'s copyright information', () => {
  const summary = {
    "id": 10,
    "__v": 0,
    "copyright": "©2017 ad nostrud sint (P)2020 minim qui ex",
    "short_summary": "this is a short summary",
    "summary": "this is summary"
}
  const wrapper = shallow(<BookSummary summary={summary} key={"10"}/>);

  const copyrightSpan = wrapper.find('span.copyright')
  const copyrightResult = copyrightSpan.text();

  expect(copyrightResult).toBe("©2017 ad nostrud sint (P)2020 minim qui ex")

})