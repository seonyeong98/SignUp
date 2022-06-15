import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FMT from './../Utils/Format'
import VAD from './../Utils/Validation'

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
          info: {},
          userId: null,
          userPw: null,
          name: null,
          birth: null,
          gender: null,
          email: null,
          pnu: null,
          deleteId: '',
          fileInfos: [],
          startDate: new Date()
        }
    }
    
    componentDidMount() {
      this.getUser();
    }


    getUser = () => {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

      this.setState({
        info: userInfo
      })
    }


    /*commit test*/
    updateUser = () => {

      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      //param을 this.state.info로 보내면 하나하나 다 적어주지 않아도 됨
      const param = this.state.info;
      //fileInfos에 정보를 담아줌
      const fileInfos = this.state.fileInfos;
      if (fileInfos.length > 0) {
        param.fileInfo = fileInfos[0];
      }

      console.log("param:" , param);
      axios.patch(`/api/update/${userInfo.id}`, param)
      .then(res => {
          alert("수정되었습니다.");
          console.log(res);
          const fileId = res.data.fileId;
          const userPk = res.data.userKey;
          userInfo.fileId = fileId;
          this.setState({
            info: userInfo
          })
      })
      .catch(error => {
      })

      axios.get(`/api/info/${userInfo.id}`)
      .then(res => {
        console.log(res);
        this.setState({
          info: userInfo
        })
      })
    }

    
    /*
    handleInput = (e) => {
      //const id = e.target.id;
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        //파싱해온 데이터를 수정가능하게 함
        info: {
            ...this.state.info,
            [name]: value
          }
      });
    }
    */

    handleInput = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      if (name === "file") {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          const config = {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          }
          axios.post(`/api/upload-file`, formData, config)
          .then(res => {
            this.setState({
              fileInfos: res.data.data
            });
            alert("파일이 첨부되었습니다.")
          }).error(err => {
            console.log(err)
            alert("첨부파일이 존재하지 않습니다.")
          });
      } else if (name === "pnu") {
        value = FMT.autoHyphen(value);
      }

      this.setState({
        info: {
          ...this.state.info,
          [name]: value
        }
      });

    }


    validCheck = async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      console.log(name, value)
      if (name === 'email') {
        if (value) {
          if (!VAD.isValidEmail(value)) {
              alert("유효하지 않은 이메일 형식입니다.");
              value = ""
          }
        }
      }
      this.setState({
        info: {
          ...this.state.info,
          [name]: value
        }
      });
    }

  

    deleteFile = () => {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      console.log("삭제전: ", userInfo);
      axios.delete(`/api/remove/${userInfo.id}`)
      .then(res => {
        alert("삭제되었습니다.");
        userInfo.fileId = null;
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log("파일삭제후 ", JSON.parse(sessionStorage.getItem('userInfo')));
        this.setState({
          info: userInfo
        })
      })
    }


    deleteUser = () => {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      axios.delete(`/api/delete/${userInfo.id}`)
      .then(res => {
        alert("삭제되었습니다.");
        document.location.href = '/'
        console.log(res);
      })
    }
    

    setStartDate = (date) => {
      this.setState({
        info: {
          ...this.state.info,
          birth: date
        }
      });
    }
 


  render() {
    const {info} = this.state;
      return (
          <>
          <form onSubmit={e => e.preventDefault()}>
          이름<br/>
          <input type="text" id="name" name='name' value={info.name} onChange={this.handleInput}/><br/>
          생년월일<br/>
          <DatePicker
            name='birth'
            selected={Date.parse(info.birth)}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => this.setStartDate(date)}
          />

          성별<br/>
          
          {/*
          <select name="gender" value={info.gender} onChange={this.handleInput}>
            <option value="">선택</option>
            <option value="female">여성</option>
            <option value="male">남성</option>
          </select>*/}

          <div>
          <input type="radio" name = "gender" id="male" value="male" checked={info.gender === "male"} onChange={this.handleInput}/>
          <label for = "male">남성</label>
          </div>
          <div>
          <input type="radio" name = "gender" id = "female" value="female" checked={info.gender === "female"} onChange={this.handleInput}/>
          <label for = "female">여성</label>
          </div>
          이메일<br/>
          <input type="text"  id="email" name='email' value={info.email} onChange={this.handleInput} onBlur={this.validCheck}/><br/>
          전화번호<br/>
          <input type="text"  id="pnu" name='pnu' value={info.pnu} onChange={this.handleInput} maxLength="13"/><br/>
          {
            info.fileId
            ? <>
              <img src={`http://localhost:8080/api/file/${info.fileId}`}/>
              <button onClick={this.deleteFile}>삭제</button>    
              </>
            : <>
              <input type="file" name="file" onChange={this.handleInput}/>
              </>
          }

          <br/><br/><br/>
          <input type="button" value="수정" onClick={this.updateUser}/>
          <input type="button" value="탈퇴" onClick={this.deleteUser}/>
          <br/>
          </form>       
          </>
    )
  }
}

export default Update;

