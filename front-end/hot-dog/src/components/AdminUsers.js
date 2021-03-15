import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';
import UsersTable from './AdminUsersTable';

class AdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch('http://localhost:5000/admin/users')
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/users.svg" alt="user icon"></img>
            Users
          </h1>
          <UsersTable apiResponse={this.state.apiResponse}></UsersTable>
        </Box>
      </AdminMain>
    );
  }
}

export default AdminUsers;
