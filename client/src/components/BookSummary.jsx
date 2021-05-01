import React from 'react';
import Summary from './Summary.jsx';

//var moment = require('moment');


const BookSummary = (props) => {


  return (
    <div className="summary">
      <h2 className="summary-heading">Publisher's Summary</h2>
      <div className="post-byline"><span className="summary-detail">{props.summary.summary.split('\n').map(str => <p>{str}</p>)}</span>
      <span className="summary-detail">{props.summary.copyright}</span>
      </div>
    </div>
  )

};

export default BookSummary;


