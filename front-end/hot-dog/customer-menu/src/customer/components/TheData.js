import React, {useState } from 'react';
import data from '../data/data';
import regular from '../images/regular.jpeg';
import example from '../images/example.jpeg';
import css from '../css/styles.css';

function TheData() {
  const [cart, setCart] = useState([])

  const addToCart = (product) =>{
    setCart([...cart, product])

  }
    return(


<div>

<header className="row block center">
<button>Go Back</button>

    <button>
    <i className="fas fa-cart-plus"></i>
      Cart ({cart.length})
      </button>
    
  </header>      

  <img class="image" src={example} className="theImages" alt="image" />

  <div className="block center">
       <h2>Address: 9600 College Way N, Seattle, WA 98103</h2>
       <h3>TUESDAY-FRIDAY | 10am to 2am | CLOSED MONDAY</h3>
       <hr></hr>
        <h1>Menu</h1>

  </div>


    <div className="products"> 
        {data.map(product => (
        
        <div className="product" key={product.id}> 
          <img className="small" src={product.img}></img>
           {product.name} 
           ${product.price}
           <div>
             <button onClick={() => addToCart(product)}>
               Add to Cart
               </button>
            </div>
           
          </div>

))};

</div>


    </div>

    )
  };
  
export default TheData;