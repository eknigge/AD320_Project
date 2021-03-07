import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';

class AdminCarts extends React.Component {
  render() {
    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/hot-dog-cart.svg" alt="cart"></img>
            Carts
          </h1>
          <hr></hr>
          {/* TODO: need a custom table for admin */}
        </Box>
      </AdminMain>
    );
  }
}

export default AdminCarts;
