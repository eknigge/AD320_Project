import React from 'react';

class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }
    
    render(){
        return(
            <tr>
                <th>{this.props.orderID}</th>
                <th>{this.props.name}</th>
                <th>{this.props.contact}</th>
                <th>{this.props.item}</th>
                <th>{this.props.price}</th>
                <th>{this.props.quantity}</th>
            </tr>
        );
    }

}

export default Order