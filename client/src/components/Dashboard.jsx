import React from 'react';
import Navbar from './navbar';
import adminImage from '../assets/admin2.png'; 

const Dashboard = () => {
  localStorage.setItem('userName', 'Sri');

  return (
    <>
      <Navbar />
      
      <div className="dashboard-content text-center mt-5">
    
        <h1 style={{ 
          color: 'black', 
          fontWeight: 'bold', 
          marginBottom: '30px' 
        }}>
          Welcome to Admin Panel!
        </h1>

      
        <div 
          style={{
            backgroundColor: '#220e24',
            padding: '20px', 
            borderRadius: '15px', 
            display: 'inline-block', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <img 
            src={adminImage} 
            alt="Admin" 
            style={{ 
              display: 'block', 
              margin: '0 auto', 
              width: '300px', 
              height: '300px', 
              objectFit: 'cover', 
              borderRadius: '15px', 
              border: '5px solid #220e24',
              marginTop: '30px' 
              
            }} 
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
