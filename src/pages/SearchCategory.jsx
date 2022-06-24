import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import Category from './../Common/Category.jsx'
import axios from 'axios'
import CategoryCode from '../pages/CategoryCode'

class SearchCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            category_group_code: null,
            x: null,
            y: null,   
            radius: null
        };
    }

    setInputValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    
    
    SearchCategory = () => {
        const category_group_code = this.state.category_group_code
        const x = this.state.x;
        const y = this.state.y;
        const radius = this.state.radius;

        /*
        const list = [];
        list.some((v,idx) => {
            console.log(idx, v)
        })
        */
        console.log("keyword: ",category_group_code, x, y, radius)

        axios.get(`/v2/local/search/category?category_group_code=${category_group_code}&x=${x}&y=${y}&radius=${radius}`)
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

    handleInput = async(event) => {
        const name = event.target.name;
        let value = event.target.value;
        await this.setState({
            [name]: value
        });
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
            <Category  handleInput={(e) => this.handleInput(e)}/>
            <input type="text" placeholder="x좌표" name="x_coord" onChange={this.handleInputX}/>
            <input type="text" placeholder="y좌표" name="y_coord" onChange={this.handleInputY}/>
            <input type="text" placeholder="검색반경" name="radius" onChange={this.handleInput} onKeyPress={(e) => { if (e.key == 'Enter') this.SearchCategory()}}/>
            <button type="button" onClick={this.SearchCategory} >검색</button>  
            <ul> 
                {
                    list.length > 0
                    ?   list.map((row, idx) => (
                            <li key={idx}>
                                {row.address_name}&nbsp;&nbsp;
                                {row.place_name}&nbsp;&nbsp;
                                {row.phone}&nbsp;&nbsp;
                            </li>
                        ))
                    :   <li>조회한 결과가 없습니다.</li>
                }
            </ul>
            </>
        );
    }
    
}

export default SearchCategory;