import React, {Component} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import '../src/pages/joinform_check';
import './App.css';
import axios from 'axios'
import Home from '../src/pages/Home'
import Join from '../src/pages/Join'
import Login from '../src/pages/Login'
import Hello from '../src/pages/Hello'
import Update from '../src/pages/Update'
import PwUpdate from '../src/pages/PwUpdate'
import Test from '../src/pages/Test'


axios.defaults.baseURL = "http://localhost:8080";
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("token");
    if(token) {
      config.headers['Authorization'] = token;
      config.headers['Access-Control-Allow-Origin'] = '*';
    } else {
      delete config.headers['Authorization']
    }
      //alert(1)
      return config;
  },
  error => {
      Promise.reject(error)
  }
);


function App() {
  //로그인 상태 관리
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/hello" element={<Hello/>}/>
        <Route path="/updateInfo" element={<Update/>}/>
        <Route path="/updatePw" element={<PwUpdate/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

