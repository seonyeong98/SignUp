import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    const onClickLogin = () => {
        console.log('click login')
        console.log('ID : ', inputId)
        console.log('PW : ', inputPw)
        /*
        axios.post('/user_inform/onLogin', null, {
            params: {
            'user_id': inputId,
            'user_pw': inputPw
            }
        })
        */
        axios.post('/api/login', {
            'user_id': inputId,
            'user_pw': inputPw
        })
        .then(res => {
            console.log(res)
            console.log('res.data.userId', res.data.userId)
            console.log('res.data.msg', res.data.msg)
            if(res.data.userId === inputId) {
                console.log('로그인 성공')
                sessionStorage.setItem('userId', inputId)
            }
        })
        .catch()
    }
 
     useEffect(() => {
         axios.get('/api/login')
         .then(res => console.log(res))
         .catch()
     },[])
 
    return(
        <div>
            <h2>Login</h2>
            <div>
                <input type='text' name='userId' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <input type='password' name='userPw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
        </div>
    )
}
 
export default Login;


import React, { Component } from 'react';
import axios from 'axios';
 
function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    const onClickLogin = () => {
        console.log('ID : ', inputId)
        console.log('PW : ', inputPw)
        axios.post('/api/login', null, {
            params: {
            'userId': inputId,
            'userPw': inputPw
            }
        })
        .then(res => {
            console.log(res)
            console.log( res.data.userId)
            if(res.data.userId === inputId) {
                console.log('로그인 성공')
                sessionStorage.setItem('userId', inputId)
            }
        })
        .catch()
    }
 
    //  useEffect(() => {
    //      axios.get('/api/login')
    //      .then(res => console.log(res))
    //      .catch()
    //  },[])
 
    return(
        <div>
            <h2>Login</h2>
            <div>
                <input type='text' name='userId' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <input type='password' name='userPw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <input type='button' onClick={onClickLogin}/>Login
            </div>
        </div>
    )
}
 
export default Login;