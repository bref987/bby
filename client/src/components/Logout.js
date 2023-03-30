import React, { useState, useEffect } from "react";

function Logout({ setAuth }) {
    const [name, setName] = useState('');

    const getName = async () => {
        try {
            const res = await fetch('http://localhost:5000/', {
            method: "GET",
            headers: { jwtToken: localStorage.jwtToken },
            });
    
            const parseData = await res.json();
            setName(parseData.name);
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
        getName();
    }, []);

    return (
        <div className='containerInput'>
            <div id='inputLogin'>
                <h1>{name}</h1>
                <button onClick={e => logout(e)}>logout</button>
            </div>
        </div>
    );
};

export default Logout;
