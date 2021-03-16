import React from 'react';
import CompleteOrders from './VendorOrders/CompleteOrders';
import SubTotalComplete from './VendorOrders/SubTotalComplete';
import BackButtonActiveOrders from './VendorOrders/BackButtonActiveOrders';

class AppCustomerMenu extends React.Component{
  render (){
    return (
    <div className="App">
      <BackButtonActiveOrders
        cartID = {this.props.match.params.id}
      />
      <h1>Completed Order Items</h1>
      <CompleteOrders
        cartID = {this.props.match.params.id}
      />
      <h1>Completed Order Totals</h1>
      <SubTotalComplete
        cartID = {this.props.match.params.id}
       />
    </div>
    )}

}

export default AppCustomerMenu;