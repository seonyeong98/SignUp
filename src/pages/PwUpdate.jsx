import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import {debounce} from 'lodash';
import axios from 'axios'

class PwUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckPw: false,
            info:{},
            id: null,
            userPw: null,
            pw2: null,
            pw1: null,
            userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
        };
    }

    componentDidMount() {

    }
    

    /*현재 비밀번호 체크 후 비밀번호 변경 가능하도록*/
    checkPw = () => {
        const userInfo = this.state.userInfo; //JSON.parse(sessionStorage.getItem('userInfo'));
        const param = {
            'id': userInfo.id,
            'userPw' : userInfo.userPw
        }
        console.log(param)
        axios.post(`/api/checkPw`, param)
        .then(res => {
            console.log(res)
            alert("현재 비밀번호가 확인되었습니다.");
            this.setState({
                isCheckPw: true
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    validationCheck = async() => {
        let failCnt = 0;
        const {pw1, pw2} = this.state;
        if (!pw1) {
            alert('비밀번호1를 입력하세요.');
            failCnt++;
        }

        if (!pw2) {
            alert('비밀번호2를 입력하세요.');
            failCnt++;
        }


        if (failCnt > 0) {
            return false;
        }
        return true;
    }

    updatePw = async() => {
        const isSuccess = await this.validationCheck();
        if (!isSuccess) {
            return;
        } 

        const {isCheckPw} = this.state;
        if (!isCheckPw) {
            alert("현재 비밀번호를 확인하여 주세요.");
            return;
        }
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        axios.patch(`/api/changePw`,
        {
            id : userInfo.id,
            userPw : userInfo.userPw
        })
        .then(res => {
            console.log(res)
            alert("변경이 완료되었습니다.");
        })
        .catch(error => {
            console.log(error);
        })
    }

    
    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name == "pw2") {
            this.handleInputChange(e);
        }
        this.setState({
            [name]: value
        });
    }



    handleInputChange = debounce ((e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value) {
            if(value !== this.state.pw1) {
                alert("비밀번호가 일치하지 않습니다.");
                this.setState({
                    pw2: ""
                })
            } else {
                alert("비밀번호가  확인되었습니다.")
            }
        }
    }, 500);

    // handleInputChange = debounce (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     if(name === "pw2") {
    //         if(value) {
    //             if(value !== this.state.pw1) {
    //                 document.getElementById("pw2").focus();
    //                 alert("비밀번호가 일치하지 않습니다.");
    //             } else {
    //                 alert("비밀번호가 확인되었습니다.");
    //             }
    //         }
    //     }
    //     console.log(name, value);
    //     this.setState({
    //         [name]: value
    //     });

    // }



    render() {
        const {info} = this.state
        return(
            <>
            <form>
                비밀번호 확인<br/>
                <input type="password" name='userPw' value={this.state.userPw} onChange={this.handleInput} /><br/>
                <input type ="button" value = "확인" onClick={this.checkPw} /><br/>
                새 비밀번호<br/>
                <input type="password" name="pw1" id="pw1" value={this.state.pw1} onChange={this.handleInput} placeholder="비밀번호"/><br/>
                <input type="password" name="pw2" id="pw2" value={this.state.pw2} onChange={this.handleInput} placeholder="비밀번호 확인" />
                {/* <input type="password" name='pw2'  onChange={e => this.handleOnConfirmPasswordInput(e.target.value)}/><br/> */}
            </form>
            <input type="button" value="저장" onClick={this.updatePw}/>
            </>
        )
    }
}

export default PwUpdate;