import React from 'react';
import ReactDOM from 'react-dom';
import Summary from './Summary.jsx';
import '../assets/styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summaries: []
    }
  };

  componentDidMount() {
    this.getBookSummary();
  }

  getBookSummary(){
  const query = new URLSearchParams(location.search);
  const bookId = query.get('bookId');
  fetch(`http://localhost:1220/api/summary/${bookId}`)
    .then((response) => response.json())
    .then(data =>this.setState({summaries: data}))
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
