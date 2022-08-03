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
    
    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

    return (
        <div className='App'>
            <BrowserRouter>
                <div className='container'>
                    <Nav/>
                    <Routes>
                        <Route path='/' exact element={isAuthenticated ? <Home /> : <Landing />} />
                        <Route path='/program' exact element={isAuthenticated ? <Program setAuth={setAuth} /> : <Navigate to='/login' />} />
                        <Route path='/program/:id' element={isAuthenticated ? <Training setAuth={setAuth}/> : <Landing /> } />
                        <Route path='/register' exact element={isAuthenticated ? <Navigate to='/program' /> : <Register setAuth={setAuth} /> } />
                        <Route path='/login' exact element={isAuthenticated ? <Navigate to='/program' /> :  <Login setAuth={setAuth}/> } />
                        <Route path='*' element={<NotFound/>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
