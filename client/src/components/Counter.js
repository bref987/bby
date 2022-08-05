import React from "react";

function TrainingProgress({isStarted, count, decrementCount, incrementCount}) {
  return (

    <div className="App">
   
        <h1>{isStarted && count}</h1>
      
        <button onClick={() => decrementCount()} className={'mr-5'}>-</button>
        <button onClick={() => incrementCount()}>+</button>

    </div>
      
  );
};

export default TrainingProgress;
