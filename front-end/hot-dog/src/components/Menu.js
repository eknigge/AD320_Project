import React from 'react';
import Box from './Box';
import Table from './Table';
import Container from './Container';

class Menu extends React.Component {
  render() {
    return (
      <Container>
        <Box>
          <Table></Table>
        </Box>
      </Container>
    );
  }
}

export default Menu;
