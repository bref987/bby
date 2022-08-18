import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import LineChart from "./LineChart";

function Statistics() {
    const [exercises, setExercises] = useState([]);

    const getExercises = async () => {
        try {
            const res = await fetch("http://localhost:5000/statistics", {
            method: "GET",
            headers: { jwtToken: localStorage.jwtToken }
            });
    
            const parseData = await res.json();
    
            setExercises(parseData);

            console.log(parseData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getExercises();
    }, []);

  return (
    <div className="containerStatistics">
        <div className="liName">
        
        <table>
        <thead>
            <tr>
                <th></th>
                <th scope="col">Day</th>
                <th scope="col">Week</th>
                <th scope="col">Month</th>
                <th scope="col">Total</th>
                <th scope="col">Chart</th>
            </tr>
        </thead>

        <tbody>
            {exercises.map(exercise => (
                <tr key={exercise.exerciseid}>

                    <td>{exercise.exercisename}</td> 
                    <td>{exercise.daily}</td>
                    <td>{exercise.weekly}</td>
                    <td>{exercise.monthly}</td>
                    <td>{exercise.total}</td>
                    <td>
                        <Link to={`/statistics/${exercise.exerciseid}`}>see</Link>
                    </td>
                </tr>
            ))}
            
        </tbody>
        </table>

        </div>
    </div>
  );
};

export default Statistics;
