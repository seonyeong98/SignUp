import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'


class TransCoord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            x: null,
            y: null,   
            output_coord: "WGS84"
        };
    }


    setInputValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    
    
    transCoord = () => {
        const x = this.state.x;
        const y = this.state.y;
        const output_coord = this.state.output_coord;

        /*
        const list = [];
        list.some((v,idx) => {
            console.log(idx, v)
        })
        */
        console.log("keyword: ", x, y, output_coord)

        axios.get(`/v2/local/geo/coord2regioncode?x=${x}&y=${y}&output_coord=${output_coord}`)
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

    handleInputCoord = async(e) => {
        let output_coord = e.target.value;
        await this.setState({
            output_coord: output_coord
        })
    }
    
    
    render() {
        const {list} = this.state;
        return(
            <>
            <input type="text" placeholder="x좌표" name="x_coord" onChange={this.handleInputX} autoFocus/>
            <input type="text" placeholder="y좌표" name="y_coord" onChange={this.handleInputY}/>
            <input type="text" placeholder="좌표 출력 형식" value={this.state.output_coord} name="output_coord" onChange={this.handleInputCoord} onKeyPress={(e) => { if (e.key == 'Enter') this.searchAddress()}}/>
            <button type="button" onClick={this.transCoord} >검색</button>  
            <ul> 
                {
                    list.length > 0
                    ?   list.map((row, idx) => (
                            <li key={idx}>
                                {row.address_name}&nbsp;&nbsp;
                            </li>
                        ))
                    :   <li>조회한 결과가 없습니다.</li>
                }


            </ul>
            </>
        );
    }
    
}

export default TransCoord;