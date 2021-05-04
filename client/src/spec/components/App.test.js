import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import "@babel/polyfill";
import fetchMock from "fetch-mock";

import App from '../../components/App.jsx';
import Summary from '../../components/Summary.jsx'
configure({ adapter: new Adapter() });
global.fetch = require('jest-fetch-mock');


describe("App", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });


  it("includes one div", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toEqual(1);
  });


  it("should render Summary", () => {
    const wrapper = shallow(<App />);
    const summary = wrapper.find(Summary);
    expect(summary.exists()).toBe(true);
  });

  it('can fetch response data', async () => {
    fetchMock.get('http://fake.com', { summary: "Sint in proident dolore do cupidatat sint enim." });
    const response = await fetch('http://fake.com');
    const result = await response.json();
    expect(result.summary).toEqual("Sint in proident dolore do cupidatat sint enim.");
  });
});