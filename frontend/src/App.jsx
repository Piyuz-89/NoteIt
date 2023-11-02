import { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import { AuthProvider } from "./components/auth/Auth"
import ProtectedRoute from './components/auth/ProtectedRoute';
import axios from 'axios';

import Register from './components/login/Register';
import Login from './components/login/Login';
import Navigation from './components/Navbar';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <AuthProvider>
      <Navigation/>
      <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          {/* <ProtectedRoute path='/home' component={Home}/>
          <ProtectedRoute path='/create' component={CreateNote}/>
          <ProtectedRoute path='/edit' component={EditNote}/> */}
      </Routes>
    </AuthProvider>
  )
}

export default App
