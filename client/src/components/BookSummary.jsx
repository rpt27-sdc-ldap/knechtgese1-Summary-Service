import React from 'react';
import Summary from './Summary.jsx';



const BookSummary = (props) => {


  return (
    <div className="summary">
      <h2 className="summary-heading">Publisher's Summary</h2>
      <div className="publisher-summary">
        <span className="summary-detail">{props.summary.summary.split('\n').map((str,index)  => <p key={index}>{str}</p>)}</span>
        <span className="copyright">{props.summary.copyright}</span>
      </div>
    </div>
  )

};

export default BookSummary;


