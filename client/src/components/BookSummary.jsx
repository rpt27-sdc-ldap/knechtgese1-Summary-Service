import React from 'react';
import Summary from './Summary.jsx';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';

function changeClass() {
  var content = document.getElementById("extra_content");
  var btn = document.getElementById("read_more");
  content.classList.toggle('show');

  if (content.classList.contains("show")) {
      btn.innerHTML ="Show less" + '▴';
      document.getElementById("main").classList.remove("normal");

  } else {
      btn.innerHTML ="Show more" + '▾';
      document.getElementById("main").classList.add("normal");
  }
}

const BookSummary = (props) => {


  return (
    <div className="summary">
      <h2 className="summary-heading">Publisher's Summary</h2>
      <div className="publisher-summary">
        <span id="main" className="summary-detail normal">{props.summary.summary.split('\n').map((str, index) => <p key={index}>{str}</p>).slice(0, 1)}</span>
        <span id="extra_content" className="extra_content"><span className="summary-detail hidden">{props.summary.summary.split('\n').map((str, index) => <p key={index}>{str}</p>).slice(1)}</span>
        <span className="copyright">{props.summary.copyright}</span></span>
        <button id="read_more" className="read_more" onClick={changeClass} > Show More </button>
      </div>
    </div>
  )


};

export default BookSummary;


