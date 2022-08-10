import React from "react";

function CurrentProgram({isStarted, training, exercise}) {
  return (
    <div className="mt-5 justify-content-around display-flex">
        <ul className='program'>
            {exercise.map((exer, index) => (
                <li key={index} className='border border-secondary me-2'>    
                    <h1>{exer}</h1>
                </li>
            ))}
        </ul>

        <h1>{isStarted && training}</h1>
                
    </div>
  );
};

export default CurrentProgram;