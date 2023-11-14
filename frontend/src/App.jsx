import { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import { AuthProvider } from "./components/auth/Auth"
import ProtectedRoute from './components/auth/ProtectedRoute';

import Register from './components/login/Register';
import Login from './components/login/Login';
import Navigation from './components/Navbar';
import Home from './components/Home';
import CreateNote from './components/note/CreateNote';
import EditNote from './components/note/EditNote';
import Toast from './components/Toast';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <AuthProvider>
      <Navigation/>
      <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<Home/>} /> 
            <Route path='/create' element={<CreateNote/>} />
            <Route path='/edit/:id' element={<EditNote/>} />
          </Route>    
      </Routes>
      <Toast />
    </AuthProvider>
  )
}

export default App
