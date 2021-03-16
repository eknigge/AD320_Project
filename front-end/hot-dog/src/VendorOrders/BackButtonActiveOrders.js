import React from 'react';
import { Link } from 'react-router-dom';

class BackButtonActiveOrders extends React.Component{
    constructor(props){
        super(props);
        this.state = {tableDataisFetched:false}
    }

    render(){
        return (
            <>
                <Link to={`/vendor/orders/${this.props.cartID}`}>
                    <button className="large ui blue button">
                    Return 
                    </button>
                </Link>
            </>
        )
    }


}

export default BackButtonActiveOrders