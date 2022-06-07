import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'

class Home extends Component {

    componentDidMount() {
        const token = sessionStorage.getItem("token");
        if (token) {
            //alert(token);
            return true;
        } else {
            return false;
        }

    }


    render() {
        return (
            <>
            <h2>메인페이지</h2><br/>
            <Link to="/join">회원가입</Link>&nbsp;&nbsp;
            <Link to="/login">로그인</Link>&nbsp;&nbsp;
            </>
        );

    }
}

export default Home;