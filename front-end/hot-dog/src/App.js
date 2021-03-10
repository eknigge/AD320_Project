import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VendorMenu from './components/VendorMenu';
import VendorMain from './components/VendorMain';
import Main from './customer/components/TheData';
import Home from './customer/components/Home';
import AppCustomerMenu from './AppCustomerMenu';
import AppVendorOrders from './AppVendorOrders';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/menu" component={Main} />
        <Route path="/vendor/:id" exact component={VendorMain} />
        <Route path="/vendor/menu/:id" component={VendorMenu} />
        <Route path="/vendor/orders/:id" component={AppVendorOrders} />
        <Route path="/customer/menu/:id" component={AppCustomerMenu} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
