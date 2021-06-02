import React,  {lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
const Summary = lazy(() => import('./Summary.jsx'));
import '../assets/styles.scss';
const renderLoader = () => <p>Loading</p>;

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
  fetch(`http://18.188.135.5:1220/api/summary/${bookId}`)
    .then((response) => response.json())
    .then(data =>this.setState({summaries: data}))
    .catch(err => err)
    }

  render() {
    if(this.state.summaries.length <= 0){
      return (
        <div style={{color: "blue", padding: "25px",
        fontFamily: "Arial", textalign:"center"}}>The Book you requested is not available. Please try another book!</div>
      )
    } else {
    return (
      <Suspense fallback={renderLoader()}>
      <div>
        <Summary summaries={this.state.summaries} />
      </div>
      </Suspense>
     );
  }
}
}


export default App;
