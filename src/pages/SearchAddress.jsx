import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'


class SearchAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            query: null,   
        };
    }

    componentDidMount(){
        //this.searchAddress();
    }
    
    handleInputQuery = (e) => {
        this.setInputValue("query", e.target.value)
    }

    setInputValue = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    
    
    searchAddress = () => {
        const query = this.state.query;

        /*
        const list = [];
        list.some((v,idx) => {
            console.log(idx, v)
        })
        */
        console.log("keyword: ", query)

        axios.get(`/v2/local/search/address?query=${query}`)
        .then(res => {
            console.log(res);
            this.setState({
                address: res.data,
                list: res.data.documents //응답 받은 데이터를 documents까지 감싸줌
            })
        })
        .catch(error =>{
            console.log(error);
        })
    }

    searchSpace = async(event) => {
        let query = event.target.value;
        await this.setState({
            query: query
        });
    }
    
    
    render() {
        const {list} = this.state;
        return(
            <>
            <input type="text" placeholder="주소" name='coord' onChange={this.searchSpace} onKeyPress={(e) => { if (e.key == 'Enter') this.searchAddress()}} autoFocus/>
            <button type="button" onClick={this.searchAddress} >검색</button>  
            <ul>
                {
                    list.length > 0
                    ?   list.map((row, idx) => (
                            <li key={idx}>
                                {row.address.address_name}
                                {row.address_type}
                            </li>
                        ))
                    :   <li>조회한 결과가 없습니다.</li>
                }
            </ul>
            </>
        );
    }
}

export default SearchAddress;