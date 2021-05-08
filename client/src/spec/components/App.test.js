import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import "@babel/polyfill";
import fetchMock from "fetch-mock";

import App from '../../components/App.jsx';
import Summary from '../../components/Summary.jsx'
configure({ adapter: new Adapter() });
global.fetch = require('jest-fetch-mock');

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;


describe("App", () => {
  it("should render App correctly", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });


  it("should includes one div", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toEqual(1);
  });


  it("should render Summary component", () => {
    const wrapper = shallow(<App />);
    const summary = wrapper.find(Summary);
    expect(summary.exists()).toBe(true);
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
  it('should render the Summary component with data correctly', () => {
    const wrapper = shallow(<Summary summaries={summaries} />)
    expect(wrapper).toMatchSnapshot();

  });

  it('should render empty array when there is no data to map through', () => {
    const wrapper = shallow(<Summary summaries={[]} />);
    expect(wrapper).toMatchSnapshot();

  });

  it('should not break with an empty array', () => {
    const wrapper = shallow(<Summary summaries={[]} />);
    expect(wrapper.find('summaries')).toHaveLength(0);

  });

  it("should render Summary component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.children(Summary).length).toBe(1);
  });

  it('should fetch the correct data from the api', async () => {
    const expectedSummary = "Sint in proident dolore do cupidatat sint sunt consequat adipisicing Lorem reprehenderit mollit commodo.";
    fetchMock.get('http://localhost:1220/api/summary/50', [
      {
        "_id": "608b721f197222ffe5e1561b",
        "id": 50,
        "__v": 0,
        "copyright": "©2017 ad nostrud sint (P)2020 minim qui ex",
        "short_summary": "Tempor ad cupidatat sint ad laboris dolore fugiat fugiat excepteur.",
        "summary": expectedSummary
      }
    ]);

    const wrapper = await mount(<App />);
    const result = await wrapper.instance();

    await new Promise(res => setTimeout(() => {
      expect(Array.isArray(result.state.summaries)).toEqual(true);
      wrapper.update();
      res()
    }, 500));

    expect(result.state.summaries.length).toBe(1);
    //console.log(result.state.summaries);
    expect(result.state.summaries[0].summary).toEqual(expectedSummary);
    expect(result.state.summaries[0]).toHaveProperty(`summary`, expectedSummary);
    //console.log(result.state.summaries);
    //expect(fetch).toHaveBeenCalledWith('http://example.com')
  });

});