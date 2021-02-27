import './App.css';
import './VendorOrders/Order';
import AllOrders from './VendorOrders/AllOrders'

function AppCustomerMenu() {
  return (
    <div className="App">
      <h1>Orders</h1>
      <AllOrders />
    </div>
  );
}

export default AppCustomerMenu;
