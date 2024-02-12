import React from 'react';
import Navbar from './Navbar';

function Home() {
  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Navbar />
      <div className='container my-3'>
        <h1 className='text-center fw-bold'>HomePage</h1>
        {userData && (
          <div>
            <h2>User Details:</h2>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>

          </div>
        )}
      </div>
      
    </>
  );
}

export default Home;
