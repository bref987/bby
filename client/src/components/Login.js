import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const { name, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const body = { name, password };
        const response = await fetch(
            'http://localhost:5000/authentication/login',
            {
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
    <Fragment>
        <h1 className='mt-5 text-center'>Login</h1>
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
            type='password'
            name='password'
            value={password || ''}
            placeholder='password'
            onChange={e => onChange(e)}
            className='form-control my-3'
            />
            <button className='btn btn-success btn-block'>Submit</button>
        </form>
        <Link to='/register'>register</Link>
    </Fragment>
  );
};

export default Login;
