import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';

class AdminLanding extends React.Component {
  render() {
    return (
      <AdminMain>
        <Box>
          <img src="/images/adminMeme.jpg" alt="admin meme"></img>
        </Box>
      </AdminMain>
    );
  }
}

export default AdminLanding;
