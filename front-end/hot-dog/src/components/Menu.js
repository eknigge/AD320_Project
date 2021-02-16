import React from 'react';
import Box from './Box';
import Table from './Table';
import Container from './Container';

class Menu extends React.Component {
  errorHandling() {
    if (this.props.apiResponse) {
      if (this.props.apiResponse.error) {
        return (
          <div className="ui error message">
            <h2 className="ui centered header">
              {this.props.apiResponse.error}
            </h2>
          </div>
        );
      } else {
        return (
          <Box>
            <h2 className="ui header">
              <i className="clipboard outline icon"></i>Menu
            </h2>
            <Table apiResponse={this.props.apiResponse}></Table>
          </Box>
        );
      }
    }
  }

  render() {
<<<<<<< HEAD
    return (
      <Container>
        <Box>
          <Table apiResponse={this.props.apiResponse}></Table>
        </Box>
      </Container>
    );
=======
    return <Container>{this.errorHandling()}</Container>;
>>>>>>> d4060eb... added error handing for showing vendor menu
  }
}

export default Menu;
