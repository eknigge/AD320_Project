import React from 'react';
import AllOrders from './VendorOrders/AllOrders';
import SubTotal from './VendorOrders/SubTotal';
import { Link } from 'react-router-dom';

class AppCustomerMenu extends React.Component{
  render (){
    return (
    <div className="App">
      <Link to={`/vendor/${this.props.match.params.id}`}>
        <button className="large ui blue button">
          Return to Main
        </button>
      </Link>
      <h1>Order Items</h1>
      <AllOrders 
        cartID = {this.props.match.params.id}
      />
      <h1>Order Totals</h1>
      <SubTotal
        cartID = {this.props.match.params.id}
       />
    </div>
    )}

}

export default AppCustomerMenu;