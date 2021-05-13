import React from 'react';
import ReactDOM from 'react-dom';
import Summary from './Summary.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summaries: []
    }
  };

  componentDidMount() {
    this.getData();
  }

 getData(bookId) {
    bookId = Math.floor(Math.random() * 100);
    fetch(`http://localhost:1220/api/summary/${bookId}`)
      .then(response => response.json())
      .then(response => this.setState({ summaries: response }))
      .catch(err => err)
  }

  render() {
    return (
      <div>
        <Summary summaries={this.state.summaries} />
      </div>
     );
  }
}


export default App;
