import React from 'react';
import Order from './Order'
import SubTotal from './SubTotal';

class AllOrders extends React.Component{
    constructor(props){
        super(props);
        this.state = {tableDataisFetched:false}
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        fetch("http://localhost:5000/vendor/orders/3")
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
                        key = {item.ORDER_ID}
                        orderID = {item.ORDER_ID}
                        name = {item.FIRST_NAME + " " +item.LAST_NAME}
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
            </div>
        )
    }

    /*
    Add subtotal function
    */
   getSubtotal(){
       return <SubTotal dollarValue='3.00'/>
   }

}

export default AllOrders