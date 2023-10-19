import { useEffect, useState } from 'react'
import { AuthProvider } from "./components/auth/Auth"
import axios from 'axios';

import './App.css'

function App() {

  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
    
      </Routes>
    </AuthProvider>
  )
}

export default App
