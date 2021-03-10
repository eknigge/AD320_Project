import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VendorMenu from './components/VendorMenu';
import VendorMain from './components/VendorMain';
import Main from './customer/components/TheData';
import Home from './customer/components/Home';
import AppCustomerMenu from './AppCustomerMenu';
import AppVendorOrders from './AppVendorOrders';
import CustomerMain from './components/CustomerMain';
import VendorPunchCard from './components/VendorPunchCard';
import AdminMain from './components/AdminMain';
import AdminCarts from './components/AdminCarts';
import EditCart from './components/EditCart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/menu" component={Main} />
        <Route path="/vendor" exact component={VendorPunchCard} />
        <Route path="/vendor/:id" exact component={VendorMain} />
        <Route path="/vendor/menu/:id" component={VendorMenu} />
        <Route path="/vendor/orders/:id" component={AppVendorOrders} />
        <Route path="/customer/menu" component={AppCustomerMenu} />
        <Route path="/customer/map" component={CustomerMain} />
        <Route path="/admin" exact component={AdminMain} />
        <Route path="/admin/carts" exact component={AdminCarts} />
        <Route path="/admin/carts/edit/:id" component={EditCart} />
        <Route path="/admin/carts/new" component={EditCart} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
