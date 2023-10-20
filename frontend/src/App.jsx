import { useEffect, useState } from 'react'
import {Routes, Route, Switch} from 'react-router-dom'
import { AuthProvider } from "./components/auth/Auth"
import ProtectedRoute from './components/auth/ProtectedRoute';
import axios from 'axios';

import './App.css'

function App() {

  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Switch>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <ProtectedRoute path='/' component={<Home/>}/>
          <ProtectedRoute path='/create' component={<CreateNote/>}/>
          <ProtectedRoute path='/edit' component={<EditNote/>}/>
        </Switch>
      </Routes>
    </AuthProvider>
  )
}

export default App
