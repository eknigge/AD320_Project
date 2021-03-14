import React from 'react';
import UsersTableRow from './AdminUsersTableRow';
import { Link } from 'react-router-dom';

class UsersTable extends React.Component {
  renderUsers() {
    if (this.props.apiResponse.length > 0) {
      const allUsers = this.props.apiResponse.map((user) => {
        return (
          <UsersTableRow
            key={user.User_ID}
            id={user.User_ID}
            firstName={user.First_Name}
            lastName={user.Last_Name}
            role={user.Permission}
            email={user.Email}
          />
        );
      });
      return <tbody>{allUsers}</tbody>;
    }
  }

  render() {
    return (
      <table className="ui striped stackable table">
        <thead>
          <tr>
            <th className="collapsing">User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Email</th>
            <th className="collapsing">Edit</th>
            <th className="collapsing">Delete</th>
          </tr>
        </thead>
        {this.renderUsers()}
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
              <Link to="/admin/users/new">
                <button className="ui right floated medium green button">
                  Add New User
                </button>
              </Link>
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default UsersTable;
