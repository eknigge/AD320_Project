import React from 'react';
import Box from './Box';
import Table from './Table';
import Container from './Container';

class Menu extends React.Component {
  render() {
    return (
      <Container>
        <Box>
          <h2 className="ui header">
            <i className="clipboard outline icon"></i>Menu
          </h2>
          <Table apiResponse={this.props.apiResponse}></Table>
        </Box>
      </Container>
    );
  }
}

export default Menu;
