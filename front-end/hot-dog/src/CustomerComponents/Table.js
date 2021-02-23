import React from 'react';
import TableRow from './TableRow';
let testData = require('./testdata.json')
const fetch = require('node-fetch');

class Table extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.getData();
    }

    getData(){
        let url = 'http://localhost:5000/customer/1';

        fetch(url)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch((error) =>{
                console.error('Error Message:', error);
            })
    }

    renderItems(){
        let output = testData.data.map( (item) =>{
            return (
                <TableRow
                    item = {item.ITEM_NAME}
                    description = {item.DESCRIPTION_ITEM}
                    price = {item.PRICE}
                />
            );
        });
        return <tbody>{output}</tbody>;
    }

    render(){
        return (
            <table className="custTable">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
                </thead>
                {this.renderItems()}
            </table>
        );
    }

}
export default Table;
