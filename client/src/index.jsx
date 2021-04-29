import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: []
    }
  }

  getData(){
    let url: 'http://localhost:1220/summary',
    reques = $.ajax({
      url: url,
      method: 'GET'
    });
    request.done(function (result) {
    console.log('This is the result coming from the serbver', result)
    this.setState({
      summary: result
    });
  });

}

  render() {
      return (

      <div>
       <h1>Hello World!</h1>
      </div>

      );

  }
}

ReactDOM.render(<App />, document.getElementById('app'));


