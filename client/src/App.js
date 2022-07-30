import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Program from './components/Program';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className='App'>
        <BrowserRouter>
            <div className='App'>
                <Nav/>
                <Routes>
                    <Route path='/' exact element={<Home/>} />
                    <Route path='/program' element={<Program/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='*' element={<NotFound/>} />
                </Routes>
            </div>
        </BrowserRouter>
    </div>
    );
}

export default App;
