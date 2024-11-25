import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import EmployeeList from './components/EmployeeList';
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/employee-list' element={<EmployeeList/>}></Route>
      <Route path='/create/'element={<CreateUser/>}> </Route>
      <Route path='/update/:id'element={<UpdateUser/>}> </Route>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
