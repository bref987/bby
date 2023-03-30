import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="jumbotron mt-5">
        <h1>Welcome to BYsport app</h1>
        <p>BYsport Workout! Train with your device browser! Your personal trainer for free.
        The best BYsport Workout app is coming with its unique design and powerful function.
        This is a real personal fitness trainer. This is a cool body builder. 
        BYsport Workout not only helps counting the number of workout exercises you do, but also makes the training plan based on your weekly training.</p>
        <p>Login/Register to start training</p>
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
