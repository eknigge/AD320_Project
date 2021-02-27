import React from 'react';

class SubTotal extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <tr>
                <td>{this.props.order}</td>
                <td>{this.props.total}</td>
            </tr>
        );
    }
}

export default SubTotal