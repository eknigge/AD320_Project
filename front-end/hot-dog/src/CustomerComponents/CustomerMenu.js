import React from 'react';
import Table from './Table';

class CustomerMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
        <div>
            <h1>Menu</h1>
            <Table />
        </div>
        )
    }
}

export default CustomerMenu 
