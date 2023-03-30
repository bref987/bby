import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


function Program() {
    const [exercises, setExercises] = useState([]);

    const getExercises = async () => {
        try {
            const res = await fetch("http://localhost:5000/program", {
            method: "GET",
            headers: { jwtToken: localStorage.jwtToken }
            });
    
            const parseData = await res.json();
    
            setExercises(parseData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getExercises();
    }, []);

  return (
    <div className='containerProgramme'>
        {exercises.map(exercise => (
            <Link to={`/program/${exercise.exerciseid}`}>
                <button className="prImage" key={exercise.exerciseid}>
                    {exercise.name}
                    {/* {<img src={`./../${exercise.exerciseid}.png`} />} */}
                </button>
                
            </Link>
        ))}
    </div>
  );
};

export default Program;
