import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VendorMenu from './components/VendorMenu';
import VendorMain from './components/VendorMain';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/vendor" exact component={VendorMain} />
        <Route path="/vendor/menu/:id" component={VendorMenu} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
