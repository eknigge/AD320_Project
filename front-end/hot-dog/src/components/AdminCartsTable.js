import React from 'react';
import CartsTableRow from './AdminCartsTableRow';
import { Link } from 'react-router-dom';

class CartsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  renderCarts() {
    if (this.props.apiResponse.length > 0) {
      const allCarts = this.props.apiResponse.map((cart) => {
        let locArr = cart.Location.split(',');
        let lat = parseFloat(locArr[0]).toFixed(4);
        let lng = parseFloat(locArr[1]).toFixed(4);
        let formattedLocation = `${lat}, ${lng}`;
        return (
          <CartsTableRow
            key={cart.Cart_ID}
            cartId={cart.Cart_ID}
            location={formattedLocation}
            status={cart.Available === 'Y' ? 'Available' : 'Unavailable'}
            vendorName={`${cart.First_Name} ${cart.Last_Name}`}
            userID={cart.User_ID}
            menuID={cart.menu_ID}
            menuTitle={cart.menu_Title}
          />
        );
      });
      return <tbody>{allCarts}</tbody>;
    } else {
      return (
        <tbody>
          <tr>
            <td>{JSON.stringify(this.props.apiResponse)}</td>
          </tr>
        </tbody>
      );
    }
  }

  render() {
    return (
      <table className="ui striped stackable table">
        <thead>
          <tr>
            <th className="collapsing">Cart ID</th>
            <th>Location</th>
            <th>Status</th>
            <th>Vendor (id-name)</th>
            <th>Menu (id-title)</th>
            <th className="collapsing">Edit</th>
            <th className="collapsing">Delete</th>
          </tr>
        </thead>
        {this.renderCarts()}
        <tfoot className="full-width">
          <tr>
            <th>
              <button
                className="ui medium button"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
            </th>
            <th colSpan="6">
              <Link to="/admin/carts/new">
                <button className="ui right floated medium green button">
                  Add New Cart
                </button>
              </Link>
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default CartsTable;
