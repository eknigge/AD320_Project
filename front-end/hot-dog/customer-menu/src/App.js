import React from 'react';
import Main from './customer/components/Main';

//Allows us to change browser, navigate between different components
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Route path="/menu" component ={Main} />
    </Router>
  

  );
};

export default App;








