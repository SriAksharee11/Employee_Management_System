import "./home.css";
import React from 'react';
import logo2 from "../assets/logo2.png"; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#220e24' }}>
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <img src={logo2} alt="Logo2" className="logo" />
            <h2 className="text-white ms-3">Employee Hub</h2>
          </div>
          <div className="collapse navbar-collapse">
            <div className="d-flex">
              <button className="btn btn-warning me-2" onClick={handleLoginClick}> Log In</button>
            </div>
          </div>
        </div>
      </nav>

      
      <div className="home-page-content">
        <div id="home" className="home-container text-center text-white d-flex flex-column align-items-center justify-content-center">
          <h1> </h1>
          
        </div>
      </div>

    
    </>
  );
};

export default Home;


