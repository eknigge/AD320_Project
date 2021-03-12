import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';

class AdminUsers extends React.Component {
  render() {
    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/users.svg" alt="cart"></img>
            Users
          </h1>
        </Box>
      </AdminMain>
    );
  }
}

export default AdminUsers;
