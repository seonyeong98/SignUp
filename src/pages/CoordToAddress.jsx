import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'


class CoordToAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            x: null,
            y: null,   
        };
    }

    componentDidMount(){
        //this.searchAddress();
    }
    
    handleInputQuery = (e) => {
        this.setInputValue("coord", e.target.value)
    }

    setInputValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    
    
    searchAddress = () => {
        const x = this.state.x;
        const y = this.state.y;

        /*
        const list = [];
        list.some((v,idx) => {
            console.log(idx, v)
        })
        */
        console.log("keyword: ", x, y)

        axios.get(`/v2/local/geo/coord2address?x=${x}&y=${y}`)
        .then(res => {
            console.log(res);
            this.setState({
                //address: res.data,
                list: res.data.documents
            })
        })
        .catch(error =>{
            console.log(error);
        })
    }

    handleInputX = async(event) => {
        let x = event.target.value;
        await this.setState({
            x: x
        });
    }

    handleInputY = async(event) => {
        let y = event.target.value;
        await this.setState({
            y: y
        });
    }
    
    
    render() {
        const {list} = this.state;
        return(
            <>
            <input type="text" placeholder="x좌표" name="x" onChange={this.handleInputX} autoFocus/>
            <input type="text" placeholder="y좌표" name="y" onChange={this.handleInputY} onKeyPress={(e) => { if (e.key == 'Enter') this.searchAddress()}}/>
            <button type="button" onClick={this.searchAddress} >검색</button>  
            <ul>
                {
                    list.length > 0
                    ?   list.map((row, idx) => (
                            <li key={idx}>
                                {row.address.address_name}&nbsp;&nbsp;
                                {row.address.region_1depth_name}
                            </li>
                        ))
                    :   <li>조회한 결과가 없습니다.</li>
                }
            </ul>
            </>
        );
    }
    
}

export default CoordToAddress;