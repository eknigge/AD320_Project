import React from 'react';
import Order from './Order'

class AllOrders extends React.Component{
    constructor(props){
        super(props);
        this.state = {tableDataisFetched:false,
            orderTotalisFetched:false
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        fetch("http://localhost:5000/vendor/orders/2")
        .then(response => {
            if (response.ok) {
                    return response;
            } 
        })
        .then(response => response.json())
        .then(json =>{
           this.setState({ apiData: json.data, tableDataisFetched:true })
        });
    }

    renderOrders(){
        let output = 'Loading...'
        if(this.state.tableDataisFetched){
            output = this.state.apiData.map((item) =>{
                return (
                <Order
                    key = {item.ORDER_ID + item.ITEM_NAME}
                    orderID = {item.ORDER_ID}
                    name = {item.FIRST_NAME + " " + item.LAST_NAME[0]}
                    item = {item.ITEM_NAME}
                    price = {item.PRICE}
                    quantity = {item.QUANTITY}
                />
                );
            });
        }  
        return output;
    }

    render(){
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Item</td>
                        <td>Price</td>
                        <td>Quantity</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderOrders()}
                </tbody>
            </table>
        )
    }


}

export default AllOrders