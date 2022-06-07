import React, {Component}from 'react';
import axios from "axios";
import { render } from '@testing-library/react';

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userPw: null,
      name: null,
      birth: null,
      gender: null,
      email: null,
      pnu: null,
      fileInfos: []
    }
  }

  createUser = () => {
    console.log(this.state.fileInfos);

    const param = {
      userId: this.state.userId,
      userPw: this.state.userPw,
      name: this.state.name,
      birth: this.state.birth,
      gender: this.state.gender,
      email: this.state.email,
      pnu: this.state.pnu,
    }
    /*
    const param2 = {};
    param2.userId = this.state.userId;
    param2.userPw = this.state.userPw;
    */

    const fileInfos = this.state.fileInfos;
    if (fileInfos.length > 0) {
      param.fileInfo = fileInfos[0];
    }



    console.log(param)
    axios.post("/api/join", param)
    .then(res => {
        console.log(res.data)
        alert( "회원가입 되었습니다.")
        document.location.href = '/'
    }).error(err => {
      console.log(err)
    })

  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "file") {
        //console.log(e.target.files[0]);

        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const config = {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }
        axios.post("/api/upload-file", formData, config)
        .then(res => {
          //console.log(res.data);
          /*
          res.data.data.some(v => {
            console.log(v)
          })
          */
          this.setState({
            fileInfos: res.data.data
          });
          alert("파일이 첨부되었습니다.")
        }).error(err => {
          console.log(err)
          alert("첨부파일이 존재하지 않습니다.")
        });

    } else {
      this.setState({
          [name]: value
      });
    }
  }


  render() {
    return (
      <>
          <h1>회원가입</h1>
          <form>
            아이디<br/>
            <input type="text" id="userid" name='userId' value={this.state.userId} onChange={this.handleInput} /><br/>
            비밀번호<br/>
            <input type="password"  id="password" name='userPw' value={this.state.userPw} onChange={this.handleInput}/><br/>
            이름<br/>
            <input type="text" id="name" name='name' value={this.state.name} onChange={this.handleInput}/><br/>
            생년월일<br/>
            <input type="text"  id="birth" name='birth' value={this.state.birth} onChange={this.handleInput}/><br/>
            성별<br/>
            <select name="gender" value={this.state.gender} onChange={this.handleInput}>
            <option value="">선택</option>
            <option value="female">여성</option>
            <option value="male">남성</option>
            </select>
            <br/>
            본인 확인 이메일<br/>
            <input type="text"  id="email" name='email' value={this.state.email} onChange={this.handleInput}/><br/>
            전화번호<br/>
            <input type="text"  id="pnu" name='pnu' value={this.state.pnu} onChange={this.handleInput}/><br/>
            <input type="button" value="회원가입" onClick={this.createUser}/>
            <br/><br/><br/>

            <input type="file" name="file" onChange={this.handleInput}/><br/>
            </form>
            </>
      );

  }
}

export default Join;
