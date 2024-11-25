import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../assets/logo2.png';

const Navbar = () => {
  const navigate = useNavigate();

 
  const userName = localStorage.getItem('userName') || 'User';

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleEmployeeListClick = () => {
    navigate('/employee-list');
  };

  const handleLogoutClick = () => {
   
    localStorage.removeItem('userName');
    
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#220e24' }}>
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center">
          <img src={logo2} alt="Logo" className="logo" />
          <h2 className="text-white ms-3">Employee Hub</h2>
        </div>
        <div className="collapse navbar-collapse justify-content-between">
      
          <div className="d-flex">
            <button
              className="btn me-3"
              style={{ backgroundColor: '#FFC107', color: '#000' }}
              onClick={handleHomeClick}
            >
              Home
            </button>
            <button
              className="btn"
              style={{ backgroundColor: '#FFC107', color: '#000' }}
              onClick={handleEmployeeListClick}
            >
              Employee List
            </button>
          </div>
          
          <div className="d-flex align-items-center">
            <span className="text-white me-3">{userName}</span>
            <button className="btn btn-danger" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
