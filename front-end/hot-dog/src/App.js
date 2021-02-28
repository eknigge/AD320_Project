import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VendorMenu from './components/VendorMenu';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/vendor/menu/:id" component={VendorMenu} />
      </Switch>
    </BrowserRouter>
  );
  
}

export default App;
