import React from 'react';
import TableRow from './TableRow';

class CustomerMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {tableDataisFetched: false};
    }

    submitOrder = () => {
        // create JSON object for back-end API
        let order = {}
        for(let key in this.state){
            order[key] = this.state[key]
        }
        let orderJSON = {
            "order": order,
            "cartID":this.props.cartID,
            "userID":2
        }

        fetch(`http://localhost:5000/customer/order/`, {
            method:'PUT',
            body:orderJSON
        })

        //for debugging purposes
        console.log(orderJSON);

    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        fetch(`http://localhost:5000/customer/${this.props.cartID}`)
        .then((response) => {
            if (response.ok) {
            return response;
            }
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({ apiData: json.data, tableDataisFetched: true }, this.initializeMenuQuantity);
        });
    };

    initializeMenuQuantity(){
        this.state.apiData.map( (item) =>{
            this.setState({[item.ITEM_ID]:0})
        })
    }


    updateQuantities = data => (
        this.setState({[data.ITEM_ID]:data.quantity})
    );

    renderItems(){
        let output = 'Loading...';
        if(this.state.tableDataisFetched){
            output = this.state.apiData.map( (item) =>{
                return (
                    <TableRow 
                        key={item.ITEM_ID}
                        item={item.ITEM_ID}
                        name={item.ITEM_NAME}
                        description={item.DESCRIPTION_ITEM}
                        price={item.PRICE}
                        quantity={this.state[item.ITEM_ID]}
                        onChange={this.updateQuantities.bind(this)}
                    />
                )
            })
        }
        return <tbody>{output}</tbody>
    }

    render(){
        return(
        <div>
            <h1>Menu</h1>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Add</th>
                        <th>Remove</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                {this.renderItems()}
            </table>
            <button onClick={this.submitOrder}> Submit Order</button>
        </div>
        )
    }
}

export default CustomerMenu 
