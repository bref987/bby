import React, { useEffect, useState } from "react";

//components

function Program ({ setAuth }) {
  const [name, setName] = useState('');

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/", {
        method: "GET",
        headers: { jwtToken: localStorage.jwtToken }
      });

      const parseData = await res.json();

      setName(parseData.name);
    } catch (err) {
      console.error(err.message);
    }
  };

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
    getProfile();
  }, []);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>Program page {name} </h2>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

    </div>
  );
};

export default Program;
