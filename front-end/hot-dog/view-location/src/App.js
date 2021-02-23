import React from 'react';
import GMap from './GMap'
import GMaps from './GMaps'


//Allows us to change browser, navigate between different components
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Switch>
      <Route path="/map" component ={GMap} />
      <Route path="/maps" component ={GMaps} />
      </Switch>
   </Router>

  );
};

export default App;








