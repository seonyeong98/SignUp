import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'

class Hello extends Component {

    onLogout = () => {
        if(sessionStorage.removeItem("token")){
            alert("로그아웃 되었습니다.");
        }
        document.location.href = '/'
    }

    render() {
        return(
            <>
            <input type="button" value='로그아웃' onClick={this.onLogout}/>&nbsp;&nbsp;
            <Link to="/updateInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/updatePw" onClick={this.pwchange}>비밀번호 변경</Link>
            </>
        )
    }
}

export default Hello;