import React from 'react';

class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div>
                <table className="custTable">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{this.props.orderID}</th>
                            <th>{this.props.name}</th>
                            <th>{this.props.item}</th>
                            <th>{this.props.price}</th>
                            <th>{this.props.quantity}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Order