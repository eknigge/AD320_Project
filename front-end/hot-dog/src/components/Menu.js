import React from 'react';
import Box from './Box';
import Table from './Table';
import Container from './Container';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  errorHandling() {
    if (this.props.apiResponse.error) {
      return (
        <div>
          <div className="ui error message">
            <h2 className="ui centered header">
              {this.props.apiResponse.error}
            </h2>
          </div>
          <Link to="/vendor">
            <button className="ui large green button">Back to main</button>
          </Link>
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

  render() {
    return <Container>{this.errorHandling()}</Container>;
  }
}

export default Menu;
