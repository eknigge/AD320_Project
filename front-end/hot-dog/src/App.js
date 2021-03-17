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
import AdminCarts from './components/AdminCarts';
import EditCart from './components/EditCart';
import AdminUsers from './components/AdminUsers';
import AppCompletedOrders from './AppCompletedOrders';
import EditUser from './components/EditUser';
import AdminLogs from './components/AdminLogs';
import AdminLanding from './components/AdminLanding';
import AdminMenu from './components/AdminMenu';
import EditMenu from './components/EditMenu';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/menu" component={Main} />
        <Route path="/vendor" exact component={VendorPunchCard} />
        <Route path="/vendor/:id" exact component={VendorMain} />
        <Route path="/vendor/menu/:id" component={VendorMenu} />
        <Route path="/vendor/orders/:id" exact component={AppVendorOrders} />
        <Route
          path="/vendor/orders/:id/complete"
          exact
          component={AppCompletedOrders}
        />
        <Route path="/customer/menu/:id" component={AppCustomerMenu} />
        <Route path="/customer/menu" component={AppCustomerMenu} />
        <Route path="/customer/map" component={CustomerMain} />
        <Route path="/admin" exact component={AdminLanding} />
        <Route path="/admin/carts" exact component={AdminCarts} />
        <Route path="/admin/carts/edit/:id" component={EditCart} />
        <Route path="/admin/carts/new" component={EditCart} />
        <Route path="/admin/users" exact component={AdminUsers} />
        <Route path="/admin/users/edit/:id" component={EditUser} />
        <Route path="/admin/users/new" component={EditUser} />
        <Route path="/admin/logs" component={AdminLogs} />
        <Route path="/admin/menu" exact component={AdminMenu} />
        <Route path="/admin/menu/edit/:id" component={EditMenu} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
