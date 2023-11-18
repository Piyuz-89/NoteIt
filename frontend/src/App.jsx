import "./App.css";
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from "./components/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Create from './components/Create';
import Navigation from "./components/Navbar";
import Edit from "./components/Edit";
import Toast from "./components/Toast";
import Error from "./Error";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  return (
    <>
    <Navigation />
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Signup/>} />
      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/edit/:id' element={<Edit/>} />
      </Route> 
      <Route path="*" element={<Error/>}/>
    </Routes>
    <Toast/>
    </>
  );
}
