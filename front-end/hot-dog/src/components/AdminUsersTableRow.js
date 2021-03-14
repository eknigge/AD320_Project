import React from 'react';
import { Link } from 'react-router-dom';

class UsersTableRow extends React.Component {
  roleColor(role) {
    if (role === 'CUSTOMER') return 'blue';
    else if (role === 'VENDOR') return 'green';
    else if (role === 'ADMIN') return 'red';
    else return 'orange';
  }

  render() {
    return (
      <tr>
        <td className="collapsing">{this.props.id}</td>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td style={{ color: `${this.roleColor(this.props.role)}` }}>
          {this.props.role}
        </td>
        <td>{this.props.email || 'N/A'}</td>
        <td>
          <Link to={`/admin/users/edit/${this.props.id}`}>
            <button className="ui blue button">Edit</button>
          </Link>
        </td>
        <td>
          <button className="ui red button" disabled={true}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default UsersTableRow;
