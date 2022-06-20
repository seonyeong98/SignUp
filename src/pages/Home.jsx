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
            <Link to="/searchAddress">주소 검색하기</Link>&nbsp;&nbsp;
            <Link to="/regioncode">좌표로 행정구역 받기</Link>&nbsp;&nbsp;
            <Link to="/coordToAddress">좌표로 주소 변환하기</Link>&nbsp;&nbsp;
            <Link to="/transCoord">좌표계 변환</Link>&nbsp;&nbsp;
            <Link to="/searchCategory">키워드로 장소 검색</Link>
            </>
        );
    }
}

export default Home;