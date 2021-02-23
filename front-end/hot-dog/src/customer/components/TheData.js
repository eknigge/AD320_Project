import React, { useState } from 'react';
import data from '../data/data';
import logo from './images/logo.jpg';
import css from '../css/styles.css';
import back from './images/back.jpg';
import x from './images/x.jpg';
import { Link } from 'react-router-dom';

function TheData() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="wrapper">
      <header className="row block center">
        <h3>
          <Link to="/">
            {' '}
            <img src={back} alt="back-arrow" />{' '}
          </Link>
        </h3>

        <div className="cart">
          <button className="cart-button">Cart ({cart.length})</button>
        </div>
      </header>
      <div className="block center">
        <h2>Address: 9600 College Way N, Seattle, WA 98103</h2>
        <h2>TUESDAY-FRIDAY | 10am to 2am | CLOSED MONDAY</h2>
        <hr></hr>
        <h1>Menu</h1>
      </div>
      <div className="products">
        {data.map((product) => (
          <div className="product" key={product.id}>
            {/*Ternary operator to disable button --- if equal to 5 then it is true (Sold out) since disable occurs otherwise false (+/add) thus, disable is not used*/}
            <div className="productsSup">
              {' '}
              <button
                className="plus"
                onClick={() => addToCart(product)}
                disabled={cart.length == 10 ? true : false}
              >
                {cart.length == 10 ? (
                  <img src={x} alt="add button" />
                ) : (
                  <b>+</b>
                )}
              </button>
              {/*img*/}
              <img className="small" src={product.img} alt={product.name}></img>
              {/*name*/}
              <div className="left">
                {product.name}
                {/*price*/}
                <div>${product.price}</div>

                {/*price*/}
                <div>{product.description}</div>
              </div>
            </div>{' '}
            {/*end productsSup*/}
          </div> //end product
        ))}
      </div>{' '}
      {/*end products*/}
    </div> //end wrapper
  );
}

export default TheData;
