import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  
  return(

<div className="wrapper">
  <h1>Hot Dog Landing Page</h1>
  <Link to="/customer/map">
    <h1>Customer Site</h1>
  </Link>
  <Link to="/vendor/">
    <h1>Vendor Site</h1>
  </Link>
  <Link to="/admin">
    <h1>Admin Site</h1>
  </Link>

</div>
       

  )

};

export default Home;