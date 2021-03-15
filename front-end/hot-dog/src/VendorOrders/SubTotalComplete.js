import React from 'react';
import SubTotalComplete from './SubTotalRowComplete';

class SubTotal extends React.Component{
    constructor(props){
        super(props);
        this.state = {orderTotalisFetched:false}
    }

    componentDidMount(){
        this.getSubTotalData();
    }

    getSubTotalData (){
        fetch(`http://localhost:5000/vendor/orders/${this.props.cartID}/subtotal/complete`)
        .then(response => {
            if (response.ok) {
                    return response;
            } 
        })
        .then(response => response.json())
        .then(json =>{
           this.setState({apiDataSubTotal: json.data, orderTotalisFetched:true})
        });
    }

    renderRows(){
        let output = 'Loading content...'
        if(this.state.apiDataSubTotal){
            output = this.state.apiDataSubTotal.map( (item) => {
                return (
                    <SubTotalComplete
                        key = {item.ORDER_ID}
                        order = {item.ORDER_ID}
                        total = {item.TOTAL}
                    />
                );
            });
        }
        return output;
    }

    render(){
        return(
            <table className="ui celled table">
                <thead>
                    <th>ORDER ID</th>
                    <th>TOTAL ($)</th>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }
}

export default SubTotal