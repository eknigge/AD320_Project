import React from 'react';
import TableRow from './TableRow';

class CustomerMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {tableDataisFetched: false};
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        fetch('http://localhost:5000/customer/1')
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
                        <th>Description</th>
                        <th>Price</th>
                        <th>Add</th>
                        <th>Remove</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                {this.renderItems()}
            </table>
        </div>
        )
    }
}

export default CustomerMenu 
