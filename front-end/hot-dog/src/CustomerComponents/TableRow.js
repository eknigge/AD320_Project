import React from 'react';

class TableRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {quantity:0}
    }

    componentDidMount(){
        if(this.props){
            this.setState({ITEM_ID:this.props.item_id})
        }
    }

    componentDidUpdate(){
        if(this.props.onChange){
            this.props.onChange(this.state);
        }
    }

    // one method to execute function on click
    addToQuantity = () => {
        let update = this.state.quantity + 1; 
        this.setState({quantity:update});
    }

    // another method of exucuting a function on a click
    removeFromQuantity(){
        let update = this.state.quantity - 1; 
        if(update < 0){ update = 0}
        this.setState({quantity:update});
    }

    render(){
        return(
            <tr>
                <td>{this.props.item}</td>
                <td>{this.props.description}</td>
                <td>{this.props.price}</td>
                <td><button onClick={this.addToQuantity}>+</button></td>
                <td><button onClick={() => this.removeFromQuantity()}>-</button></td>
                <td>{this.state.quantity}</td>
            </tr>
        );
    }
}

export default TableRow
