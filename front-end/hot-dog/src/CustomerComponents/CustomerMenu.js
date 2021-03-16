import React from 'react';
import TableRow from './TableRow';
import { Formik, Field, Form} from 'formik';
import { Link } from 'react-router-dom';

class CustomerMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {tableDataisFetched: false};
    }


    getOrder(){
        let order = {}
        for(let key in this.state){
            order[key] = this.state[key]
        }
        let orderJSON = {
            "order": order,
            "cartID":this.props.cartID,
            "userID":2
        }
        console.log(orderJSON);
        return orderJSON;
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
            body:orderJSON,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderJSON)
        })
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

    getForm(){
        return(
            <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                contact: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                let orderInfo = this.getOrder();
                for(const key in values){
                    orderInfo[key] = values[key]
                }
                console.log(orderInfo);

                // submit order to back-end
                fetch(`http://localhost:5000/customer/order/`, {
                    method:'PUT',
                    body:orderInfo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderInfo)
                })

                // provide user confirmation of order submission 
                alert("Order Submitted, Thank you");

                // refresh page
                window.location.reload(false);

            }}
            >
            <Form>
                <label htmlFor="firstName">First Name</label>
                <Field id="firstName" name="firstName" placeholder="First Name" />

                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" placeholder="Last Name" />

                <label htmlFor="contact">Contact</label>
                <Field
                id="contact"
                name="contact"
                placeholder="Phone (preferred) or Email"
                type="text"
                />
                <button type="submit">Submit</button>
            </Form>
            </Formik>
    )}

    render(){
        return(
        <div>
            <Link to={`/customer/map`}>
                <button className="large ui blue button">
                Return to Map
                </button>
            </Link>
            <Link to={`/`}>
                <button className="large ui blue button">
                Return to Home
                </button>
            </Link>
            <h1>Menu</h1>
            <table className="ui celled table">
                <thead>
                    <tr>
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
            <h1>Order Submission</h1>
            {this.getForm()}
            {/*<button onClick={this.submitOrder}> Submit Order</button>*/}
        </div>
        )
    }
}

export default CustomerMenu 
