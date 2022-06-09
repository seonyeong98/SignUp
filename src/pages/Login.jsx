import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'
import FMT from './../Utils/Format'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputId: null,
            inputPw: null,
            name: null,
            pnu: null,
            
        };
    }
    handleInputId = (e) => {
        this.setInputValue("inputId", e.target.value)
    }

    handleInputPw = (e) => {
        this.setInputValue("inputPw", e.target.value)
    }

    setInputValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    
    
    onClickLogin = () => {
        const {inputId, inputPw} = this.state;
        console.log('click login')

        const params = {
            'userId': inputId,
            'userPw': inputPw,
        }

        axios.post('/api/login', params)
        .then(res => {
            console.log(res);
            const token = res.data.token;
            const userInfo = res.data.info;
            const userId = userInfo.id;
            //console.log('res.data.userId', res.data.userId)
            //console.log('res.data.msg', res.data.msg)
            if (token) {
                sessionStorage.setItem('userId', inputId);
                sessionStorage.setItem('token', token);
                //JSON형태의 session정보를 string타입을 바꿔서 가져와야 함
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                alert(`${inputId}` + "님 로그인 성공")
                document.location.href = '/hello'
            } 
        })
        .catch(error =>{
            console.log(error);
            alert("아이디와 비밀번호를 확인해주세요.");
            
        })

    }
    
    
    render() {
        const {inputId, inputPw} = this.state;
        return(
            <>
            
            <form>
                <input type="text" placeholder="아이디" name='userId' value={inputId} onChange={this.handleInputId}/>
                <input type="password" placeholder="비밀번호" name='userPw' value={inputPw} onChange={this.handleInputPw} onKeyPress={(e) => { if (e.key == 'Enter') this.onClickLogin()}}/>
            </form>
            <br/>
            {/* 로그인 성공 시 메인 화면으로 */}
            
            <button type="button" onClick={this.onClickLogin}  >로그인</button>
            </>
        );
    }
    
}

export default Login;