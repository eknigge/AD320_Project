import React from 'react';
import { Link } from 'react-router-dom';

class CartsTableRow extends React.Component {
  render() {
    return (
      <tr>
        <td className="collapsing">{this.props.cartId}</td>
        <td>{this.props.location}</td>
        <td
          className={
            this.props.status === 'Available' ? 'positive' : 'negative'
          }
        >
          {this.props.status}
        </td>
        <td>{`${this.props.userID}-${this.props.vendorName}`}</td>
        <td>{`${this.props.menuID}-${this.props.menuTitle}`}</td>
        <td>
          <Link to={`/admin/carts/edit/${this.props.cartId}`}>
            <button className="ui blue button">Edit</button>
          </Link>
        </td>
        <td>
          <button className="ui red button">Delete</button>
        </td>
      </tr>
    );
  }
}

export default CartsTableRow;
