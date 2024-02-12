import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let res = await axios.post(`${process.env.REACT_APP_API}/api/user/sign_in`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user); // Set the user information in the state
        navigate('/');
      } else {
        console.log('Error in Login!');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <Navbar/>
    <div className='container my-3'>
   <form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={(e) => setEmail(e.target.value)}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={(e) => setPassword(e.target.value)}  type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
</form>
</div>
    </>
  )
}

export default Login