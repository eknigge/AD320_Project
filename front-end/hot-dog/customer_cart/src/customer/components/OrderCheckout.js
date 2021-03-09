import React from 'react';
import logo from './images/logo.jpg';
import chili from './images/doodle.png'

function OrderCheckout() {
  
  return(

<div className="wrapper">


<header className="home">
   
        <img className="home-logo" src={logo} />
    
</header>

<div className="welcome">
<h4>CART</h4>
</div>
<div className="home">
    <h4>YOUR ITEM</h4>
</div>


<div class="chiliSup">
<img className="chili" src={chili} alt="chili-dog" />

<h3><a href="menu">Click here to see the options of hot dog</a></h3>

</div>

   
</div>
       

  )

};

export default OrderCheckout;