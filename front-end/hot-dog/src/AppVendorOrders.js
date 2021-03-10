import React from 'react';
import AllOrders from './VendorOrders/AllOrders';
import SubTotal from './VendorOrders/SubTotal';

class AppCustomerMenu extends React.Component{
  render (){
    return (
    <div className="App">
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