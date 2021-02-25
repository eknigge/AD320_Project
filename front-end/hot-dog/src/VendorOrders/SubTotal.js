import React from 'react';

class SubTotal extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div>
                <h2>Subtotal</h2>
                <p>{this.props.dollarValue}</p>
            </div>
        );
    }
}

export default SubTotal