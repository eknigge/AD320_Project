import React from 'react';
import Basket from './customer/components/Basket';


//Allows us to change browser, navigate between different components
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Switch>
      <Route path="//" component ={Basket} />
      </Switch>
   </Router>

  );
};

export default App;








