import React from 'react';
import ReactDOM from 'react-dom';
//import "../style/main.less";
import Summary from './Summary.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summaries: []
    }
  };

  // setParam() {
  //   const bookId = Math.floor(Math.random() * 100);
  //   const param = Math.random() * bookId;

  // };
  componentDidMount() {
    this.getData();
  }


 getData(bookId) {
    bookId = Math.floor(Math.random() * 100);
    //console.log('gettingbook Summary data');
    fetch(`http://localhost:1220/api/summary/${bookId}`)
      .then(response => response.json())
      .then(response => this.setState({ summaries: response }).bind(this))
      .catch(err => err)
  }


  //     let url: '',
  //     reques = $.ajax({
  //       url: url,
  //       method: 'GET'
  //     });
  //     request.done(function (result) {
  //     console.log('This is the result coming from the server', result)
  //     this.setState({
  //       summary: result
  //     });
  //   });

  // }

  render() {


    return (
      <div>
        <Summary summaries={this.state.summaries} />
      </div>


     );

  }
}

// ReactDOM.render(<App />, document.getElementById('app'));


export default App;

//module.exports = App;