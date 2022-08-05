import React, {  useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Counter from "./Counter";
import CurrentProgram from "./CurrentProgram";


//components

function Training ({ setTrainingEnd }) {
    const [exercise, setExercise] = useState([]);
    const [session, setSession] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    let [exerciseRef, setExerciseRef] = useState(0);
    let [count, setCount] = useState(0);
    let [training, setTraining] = useState(0);
    const {id} = useParams(); 

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
        console.log(session);
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
        console.log(session);
        getExercise();
    }, []);


    return (
        <div>
           
            <button onClick={!isFinished ? getTraining : sumbitTraining} className="mt-5 btn btn-primary">
            {!isStarted ? 'Start' : isFinished ? 'Finish': 'Next'}
            </button>
           
            {!isFinished && <CurrentProgram 
                isStarted={isStarted}
                getTraining={getTraining} 
                training={training} 
                exercise={exercise} />}
            
            {isStarted && !isFinished && <Counter 
                decrementCount={decrementCount} 
                incrementCount={incrementCount}
                sumbitTraining={sumbitTraining} 
                count={count} 
                isStarted={isStarted} />}
        </div>
    );
};

export default Training;
