import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="jumbotron mt-5">
      <h1>Welcome to B-BY Sport app</h1>
      <p>Sign In and start training</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Register
      </Link>
    </div>
  );
};

export default Landing;
