import React from 'react';

class TableRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {Quantity:0}
    }

    componentDidUpdate(){
        if(this.props.quantity !== this.state.Quantity){
            this.props.onChange({ITEM_ID:this.props.item, quantity:this.state.Quantity})
        }
    }

    increaseQuantity = () =>{
        let newValue = this.state.Quantity + 1
        this.setState({Quantity:newValue})
    }

    decreaseQuantity = () =>{
        let newValue = this.state.Quantity - 1
        if(newValue < 0){
            this.setState({Quantity:0})
        } else {
            this.setState({Quantity:newValue})
        }
    }

    render(){
        return(
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>{this.props.price}</td>
                <td><button onClick={this.increaseQuantity}>+</button></td>
                <td><button onClick={this.decreaseQuantity}>-</button></td>
                <td>{this.state.Quantity}</td>
            </tr>
        );
    }
}

export default TableRow
