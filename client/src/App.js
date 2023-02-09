import React, {useState, useEffect} from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Program from './components/Program';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './components/NotFound';
import Landing from './components/Landing';
import Training from './components/Training';
import Logout from './components/Logout';
import Statistics from './components/Statistics';
import LineChart from './components/LineChart';

function App() {
    const checkAuthenticated = async () => {
        try {
        const res = await fetch("http://localhost:5000/authentication/verify", {
            method: "POST",
            headers: { jwtToken: localStorage.jwtToken }
        });
    
        const parseRes = await res.json();
    
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    useEffect(() => {
        checkAuthenticated();
    }, []);
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    
    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

    const setTrainingEnd = boolean => {
        setIsEnded(boolean);
    }

    useEffect(() => {
        setTrainingEnd();
    })

    return (
        <div className='container'>
            <BrowserRouter>
                <div className='App'>
                    <Nav/>
                    <Routes>
                        <Route path='/' exact element={isAuthenticated ? <Home /> : <Landing />} />
                        <Route path='/program' exact element={isAuthenticated ? <Program setAuth={setAuth} /> : <Landing />} />
                        <Route path='/program/:id' element={
                            isEnded && isAuthenticated ? <Navigate to='/statistics' /> : 
                            !isAuthenticated ?  <Landing /> : <Training setTrainingEnd={setTrainingEnd} />
                        } />
                        <Route path='/statistics' exact element={isAuthenticated ? <Statistics setAuth={setAuth} /> : <Landing />} />
                        <Route path='/statistics/:id' exact element={isAuthenticated ? <LineChart setAuth={setAuth} /> : <Landing />} />
                        <Route path='/register' exact element={isAuthenticated ? <Navigate to='/program' /> : <Register setAuth={setAuth} /> } />
                        <Route path='/login' exact element={isAuthenticated ? <Logout setAuth={setAuth}/> : <Login setAuth={setAuth}/> } />
                        <Route path='*' element={<NotFound/>} />
                    </Routes>
                    {/* <footer id='footer'>BYsport</footer> */}
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
