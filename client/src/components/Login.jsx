import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!values.email || !values.password) {
      setError("Both email and password are required.");
      return false;
    }
    if (!values.email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (values.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError(null);  
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (!validateForm()) return;

    axios
      .post("http://localhost:3001/Login", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          localStorage.setItem("username", result.data.username);
          navigate("/dashboard");
        } else {
          setError(result.data.error || "Invalid email or password");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again later.");
        console.error(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-warning">{error && <p>{error}</p>}</div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email:</strong></label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password:</strong></label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0 mb-2">
            Log in
          </button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password">You agree with terms & conditions</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;





























// import React, { useState } from 'react';
// import './style.css' ;
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [values, setValues] = useState({
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

   
//     const validateForm = () => {
//         if (!values.email || !values.password) {
//             setError("Both email and password are required.");
//             return false;
//         }
//         if (!values.email.includes("@")) {
//             setError("Please enter a valid email address.");
//             return false;
//         }
//         if (values.password.length < 6) {
//             setError("Password must be at least 6 characters long.");
//             return false;
//         }
//         setError(null);  
//         return true;
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         if (!validateForm()) return;  

//         axios.post('http://localhost:3000/Login', values)
//             .then(result => {
//                 if (result.data.loginStatus) {
                    
//                     localStorage.setItem("valid", true);
//                     localStorage.setItem("username", result.data.username);
//                     navigate('/dashboard');
//                 } else {
//                     setError(result.data.Error || "Invalid email or password");
//                 }
//             })
//             .catch(err => {
//                 setError("An error occurred. Please try again later.");
//                 console.log(err);
//             });
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
//             <div className='p-3 rounded w-25 border loginForm'>
//                 <div className='text-warning'>
//                     {error && <p>{error}</p>} 
//                 </div>
//                 <h2>Login Page</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor="email"><strong>Email:</strong></label>
//                         <input
//                             type="email"
//                             name='email'
//                             autoComplete='off'
//                             placeholder='Enter Email'
//                             value={values.email}
//                             onChange={(e) => setValues({ ...values, email: e.target.value })}
//                             className='form-control rounded-0'
//                         />
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor="password"><strong>Password:</strong></label>
//                         <input
//                             type="password"
//                             name='password'
//                             placeholder='Enter Password'
//                             value={values.password}
//                             onChange={(e) => setValues({ ...values, password: e.target.value })}
//                             className='form-control rounded-0'
//                         />
//                     </div>
//                     <button
//                         type='submit'
//                         className='btn btn-success w-100 rounded-0 mb-2'
//                     >
//                         Log in
//                     </button>
//                     <div className='mb-1'>
//                         <input type="checkbox" name="tick" id="tick" className='me-2' />
//                         <label htmlFor="password">You agree with terms & conditions</label>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;
