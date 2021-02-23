import React from 'react';

class TableRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <tr>
                <td>{this.props.item}</td>
                <td>{this.props.description}</td>
                <td>{this.props.price}</td>
            </tr>
        );
    }
}

export default TableRow
