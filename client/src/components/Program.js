import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

//components

function Program ({ setAuth }) {
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

    const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("jwtToken");
            setAuth(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getExercises();
    }, []);

  return (
    <div>
      <div className="mt-5 justify-content-around">
        {exercises.map(exercise => (
            <h3 key={exercise.exerciseid}>
                <Link to={`/program/${exercise.exerciseid}`}>
                    {exercise.name}
                </Link>
            </h3>
        ))}
        <button onClick={e => logout(e)} className="mt-5 btn btn-primary">Logout</button>
      </div>
    </div>
  );
};

export default Program;
