import React from 'react';
import { Link, useNavigate} from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user information from localStorage
    localStorage.removeItem('user');
    // Redirect to the login page
    navigate('/login');
  };
  return (
    <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item float-start ps-5">
        <Link to='/' className="nav-link" >Home</Link>
        </li>
        <li className="nav-item ">
          <Link to='/chat' className="nav-link" >Chat</Link>
        </li>
        <li className="nav-item float-start">
          <Link to='/signup' className="nav-link" >Signup</Link>
        </li>
        <li className="nav-item float-start">
        <Link to='/login' className="nav-link "> Login</Link>
        </li>
        <li className="nav-item float-start">
        <Link to='/signup' className="nav-link" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>      
    </div>
  </div>
 </nav>

    </>
  )
}

export default Navbar