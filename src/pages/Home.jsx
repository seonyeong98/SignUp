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
            <form>
                <button type="button">주소 검색하기</button>
                <button type="button">좌표로 행정구역 받기</button>
                <button type='button'>좌표로 주소 변환하기</button>
                <button type='button'>좌표계 변환</button>
                <button type='button'>키워드로 장소 검색</button>
            </form>
            </>
        );

    }
}

export default Home;