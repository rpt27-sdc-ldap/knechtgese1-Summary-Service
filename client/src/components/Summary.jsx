import React from 'react';
import BookSummary from './BookSummary.jsx';

const Summary = (props) => (

 <div>
   {/* {console.log(props)} */}

  {
     props.summaries.map((summary, index)=>{
     return (
     < BookSummary summary={summary} key={index}/>
     )
    })
  }

  </div>
  );

export default Summary;




