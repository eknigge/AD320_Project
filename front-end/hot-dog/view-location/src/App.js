import React from 'react';
import GMap from './GMap'


//Allows us to change browser, navigate between different components
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Switch>
      <Route path="/map" component ={GMap} />
      </Switch>
   </Router>

  );
};

export default App;








