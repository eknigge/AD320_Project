import React from 'react';
import { Link } from 'react-router-dom';

class CompleteOrdersButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {tableDataisFetched:false}
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        fetch(`http://localhost:5000/vendor/cartid/${this.props.cartID}`)
        .then(response => response.json())
        .then(data =>{
           this.setState({ cartID: data.CART_ID, tableDataisFetched:true })
        })
    }

    render(){
        return (
            <>
                <Link to={`/vendor/orders/${this.state.cartID}/complete`}>
                    <button className="large ui blue button">
                    Completed Orders
                    </button>
                </Link>
            </>
        )
    }


}

export default CompleteOrdersButton