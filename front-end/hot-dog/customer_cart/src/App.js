import React from 'react';
import Basket from './customer/components/Basket';
import Main from './customer/components/TheData';
import Home from './customer/components/Home';


//Allows us to change browser, navigate between different components
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Switch>  
      <Route path="/menu" component ={Main} />
      <Route path="/" component ={Home} />
      </Switch>  
   </Router>

  );
};

export default App;








