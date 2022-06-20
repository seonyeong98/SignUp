import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'
import CategoryCode from '../pages/CategoryCode'

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
            <select name="category_group_code" value={this.props.code} onChange={this.props.handleInput} autoFocus>
                <option value="">선택</option>
                {
                    CategoryCode.CATEGORY_GROUP_CODE.map((row, idx) => (
                        <option key={idx} value={row.code}>{row.codeNm}</option>
                    ))
                }
            </select> 
            </>
        );
    }
}

export default Category;