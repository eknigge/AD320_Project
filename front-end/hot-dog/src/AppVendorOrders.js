import './VendorOrders/Order';
import AllOrders from './VendorOrders/AllOrders';
import SubTotal from './VendorOrders/SubTotal';

function AppCustomerMenu() {
  return (
    <div className="App">
      <h1>Orders</h1>
      <AllOrders />
      <SubTotal />
    </div>
  );
}

export default AppCustomerMenu;
