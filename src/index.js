import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import  Login  from './component/Login/Login';
import { NewUserForm } from './component/Pages/NewUserForm/NewUserForm';
import { Nav } from './component/Nav/Nav';
import { Dashboard } from './component/Dashboard/Dashboard';
import { Faculty } from './component/Faculty/Faculty';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<App />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/NewUserForm' element={<NewUserForm/>} />
      <Route path='/Nav' element={<Nav />} />
      <Route path='/Dashboard' element={<Dashboard/>} />
      <Route path='/Faculty' element={<Faculty/>} />
      
      
      
      
      
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
