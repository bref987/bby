import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';


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
        <div className="containerTraining">
            <div id="plist" className="list">
                <ul className='program'>
                    {exercise.map((exer, index) => (
                        <li id={`prog${index}`} key={index} className='border border-secondary me-2'> 
                            <span className="exerciseList">
                                {exer}
                            </span>
                        </li>
                    ))}
                </ul>  
            </div>

            {isStarted && document.getElementById(`prog${exerciseRef - 1}`).classList.add('activeItem')}
            
            {isStarted && document.getElementById(`prog${exerciseRef < 2 ? exerciseRef : exerciseRef - 2}`).classList.remove('activeItem')}

            {isFinished && document.getElementById(`prog${exerciseRef - 1}`).classList.remove('activeItem')}

            {/* {isFinished && 
                [...Array(exerciseRef)]
                    .forEach((el, index) => document.getElementById(`prog${index}`).classList.add('activeItem'))} */}

            <div id="ref">
                {!isFinished ? <span>{isStarted && training}</span> : <img src="./../muscleLeft.png" />}
            </div>

            <div id="actual">
                {!isFinished ? <span>{isStarted && count}</span> : <img src="./../muscleRight.png" />}
            </div>

            <div id="but">
                <button class='rectangle' onClick={!isFinished ? getTraining : sumbitTraining} >
                    {!isStarted ? 'Start' : isFinished ? 'Finish': 'Next'}
                </button>
            </div>

            <div id="minus">
                {isStarted && !isFinished && <button class='rond' onClick={decrementCount} >-</button>}
            </div>

            <div id="plus">
                {isStarted && !isFinished && <button class='rond' onClick={incrementCount} >+</button>}
            </div>

            <div id='mes1'>
                <span>
                    {/* to be done */}
                </span>
            </div>

            <div id='mes2'>
                <h2>
                    {/* → */}
                </h2>
            </div>

            <div id='mes3'>
                <span>
                   {/* done */}
                </span>
            </div>

        </div>
    );
};

export default Training;
