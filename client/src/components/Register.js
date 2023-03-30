import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function Register({ setAuth }) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: ''
    });
    
    const { email, password, name } = inputs;
    
    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password, name };
            const response = await fetch('http://localhost:5000/authentication/register', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
    
            if (parseRes.jwtToken) {
                localStorage.setItem('jwtToken', parseRes.jwtToken);
                setAuth(true);
            } else {
                setAuth(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    
    return (
        <div className='containerInput'>
            <div id='inputLogin'>
            <h1 className='mt-5 text-center'>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type='text'
                    name='name'
                    value={name || ''}
                    placeholder='name'
                    onChange={e => onChange(e)}
                    className='form-control my-3'
                />
                <input
                    type='text'
                    name='email'
                    value={email || ''}
                    placeholder='email'
                    onChange={e => onChange(e)}
                    className='form-control my-3'
                />
                <input
                    type='password'
                    name='password'
                    value={password || ''}
                    placeholder='password'
                    onChange={e => onChange(e)}
                    className='form-control my-3'
                />
                <button>submit</button>
            </form>
            <Link to='/login'>login</Link>
        </div>
       </div>
    );
} 

export default Register;
