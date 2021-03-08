import React from 'react';
import Banner from './Banner';
import Container from './Container';
import Box from './Box';
import { Link } from 'react-router-dom';

class AdminMain extends React.Component {
  render() {
    return (
      <Container>
        <Banner vendorName="our Beloved and Respected Administrator"></Banner>
        <div className="ui grid">
          <div className="three wide column" style={{ marginTop: '1em' }}>
            <div className="ui vertical menu">
              <Link to="/admin/carts">
                <div className="item">Carts</div>
              </Link>
              <div className="item">Users</div>
              <div className="item">Menu</div>
              <div className="item">Logs</div>
            </div>
          </div>
          <div className="thirteen wide column" style={{ marginTop: '1em' }}>
            {this.props.children}
          </div>
        </div>
      </Container>
    );
  }
}

export default AdminMain;
