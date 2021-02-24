import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VendorMenu from './components/VendorMenu';
import VendorMain from './components/VendorMain';
import Main from './customer/components/TheData';
import Home from './customer/components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/vendor/:id" exact component={VendorMain} />
        <Route path="/menu" component={Main} />
        <Route path="/" exact component={Home} />
        <Route path="/vendor/menu/:id" component={VendorMenu} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
