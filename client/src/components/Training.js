import React, {  useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

//components

function Training ({ setAuth }) {
    const [exercise, setExercise] = useState([]);
    const {id} = useParams(); 

    const getExercise = async () => {
        
        try {
            const res = await fetch(`http://localhost:5000/program/${id}`, {
            method: "GET",
            headers: { jwtToken: localStorage.jwtToken }
            });
    
            const parseData = await res.json();
    
            setExercise(parseData[0].get_programm);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getExercise();
    }, []);

    const logout = async e => {
        e.preventDefault();
        try {
        localStorage.removeItem("jwtToken");
        setAuth(false);
        } catch (err) {
        console.error(err.message);
        }
    };

    return (
        <div>
            <div className="mt-5 justify-content-around">
                <ul className='program'>
                    {exercise.map((exer, index) => (
                    <li key={index}>    
                            <h1>{exer}</h1>
                    </li>
                ))}
                </ul>
                
                <button onClick={e => logout(e)} className="mt-5 btn btn-primary">Logout</button>
            </div>
        </div>
    );
};

export default Training;
