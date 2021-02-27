import React from 'react';
import Order from './Order'
import SubTotal from './SubTotal';

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

    getSubTotalData = () => {
        fetch("http://localhost:5000/vendor/orders/2/subtotal")
        .then(response => {
            if (response.ok) {
                    return response;
            } 
        })
        .then(response => response.json())
        .then(json =>{
           this.setState({ apiDataSubTotal: json.data, orderTotalisFetched:true })
        });
    }

    renderOrders(){
        let output = 'Loading...'
        if(this.state.tableDataisFetched){
            output = this.state.apiData.map((item) =>{
                return (
                    <Order
                        key = {item.ORDER_ID}
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
            <div>
                {this.renderOrders()}
                {this.renderSubtotal()}
            </div>
        )
    }

    renderSubtotal(){
        return (
            <table>
                <thead>
                    <th>ORDER ID</th>
                    <th>TOTAL ($)</th>
                </thead>
                <tbody>
                    {this.getSubtotals}
                </tbody>
            </table>
        )
    }

    getSubtotals(){
        let output = 'Loading...'
        if(this.state.orderTotalisFetched){
            console.log(this.state.apiDataSubTotal)
            output = this.state.apiDataSubTotal.map((item) =>{
                return (
                    <SubTotal
                        key = {item.ORDER_ID}
                        order = {item.ORDER_ID}
                        total = {item.TOTAL}
                    />
                );
            });
        }  
        return output;
    }

}

export default AllOrders