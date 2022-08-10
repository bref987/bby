import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Counter from "./Counter";
import CurrentProgram from "./CurrentProgram";


function Training ({ setTrainingEnd }) {
    const {id} = useParams();

    const [exercise, setExercise] = useState([]);
    const [session, setSession] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    let [exerciseRef, setExerciseRef] = useState(0);
    let [count, setCount] = useState(0);
    let [training, setTraining] = useState(0);
     
    function getTraining() {

        if (exerciseRef < exercise.length) {
            setTraining(exercise[exerciseRef]);
            setCount(exercise[exerciseRef]);

            exerciseRef += 1;
            setExerciseRef(exerciseRef);
        } else {
            setTraining(exercise[exercise.length - 1]);
            setCount(exercise[exercise.length - 1]);

            setIsFinished(true);
        }
        
        if (isStarted && session.length < exercise.length) {
            session.push(count);
            setSession(session);
        }

        setIsStarted(true);
    }
    
    function incrementCount() { 
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        count = count - 1;
        count = count < 0 ? 0 : count;
        setCount(count);
    }

    const getExercise = async () => {
        
        try {
            const res = await fetch(`http://localhost:5000/program/${id}`, {
            method: "GET",
            headers: { jwtToken: localStorage.jwtToken },
            });
    
            const parseData = await res.json();
    
            setExercise(parseData[0].get_programm[0]);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function sumbitTraining() {
        try {
            await fetch(`http://localhost:5000/addtraining/${id}`, {
            method: "POST",
            headers: {
                    'Content-Type': 'application/json',
                    jwtToken: localStorage.jwtToken 
                },
            body: JSON.stringify(
                {
                    session: [session]
                }
            )
        });

        setTrainingEnd(true);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getExercise();
    }, []); 

    return (
        <div className="container">
            <div id="plist" className="mt-5 justify-content-around display-flex">
                <ul className='program'>
                    {exercise.map((exer, index) => (
                        <li key={index} className='border border-secondary me-2'> 
                        
                        <h1>{exer}</h1>
                        
                        </li>
                    ))}
                </ul>  
            </div>

            <div id="ref">
                {!isFinished && <p>{isStarted && training}</p>}
            </div>

            <div id="actual">
                {isStarted && !isFinished && <p>{isStarted && count}</p>}
            </div>

            <div id="but">
                <button onClick={!isFinished ? getTraining : sumbitTraining} className="mt-5 btn btn-primary">
                    {!isStarted ? 'Start' : isFinished ? 'Finish': 'Next'}
                </button>
            </div>

            <div id="minus">
                {isStarted && !isFinished && <button onClick={() => decrementCount()} className="mt-5 btn btn-primary">-</button>}
            </div>

            <div id="plus">
                {isStarted && !isFinished && <button onClick={() => incrementCount()} className="mt-5 btn btn-primary">+</button>}
            </div>

            {/* {!isFinished && <CurrentProgram 
                isStarted={isStarted}
                getTraining={getTraining} 
                training={training} 
                exercise={exercise} />} */}
            
            {/* {isStarted && !isFinished && <Counter 
                decrementCount={decrementCount} 
                incrementCount={incrementCount}
                sumbitTraining={sumbitTraining} 
                count={count} 
                isStarted={isStarted} />} */}
        </div>
    );
};

export default Training;
