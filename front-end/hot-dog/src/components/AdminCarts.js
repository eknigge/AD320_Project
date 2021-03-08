import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';
import CartsTable from './AdminCartsTable';

class AdminCarts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch('http://localhost:5000/admin/carts')
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/hot-dog-cart.svg" alt="cart"></img>
            Carts
          </h1>
          <CartsTable apiResponse={this.state.apiResponse}></CartsTable>
        </Box>
      </AdminMain>
    );
  }
}

export default AdminCarts;
