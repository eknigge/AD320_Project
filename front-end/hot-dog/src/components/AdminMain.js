import React from 'react';
import Banner from './Banner';
import Container from './Container';
import { Link } from 'react-router-dom';

class AdminMain extends React.Component {
  render() {
    return (
      <Container>
        <Banner vendorName="our Beloved and Respected Administrator"></Banner>
        <div className="ui grid">
          <div className="three wide column" style={{ marginTop: '1em' }}>
            <div className="ui vertical menu">
              <div className="item">
                <Link to="/" className="admin">
                  Home
                </Link>
              </div>
              <div className="item">
                <Link to="/admin/carts" className="admin">
                  Carts
                </Link>
              </div>

              <div className="item">
                <Link to="/admin/users" className="admin">
                  Users
                </Link>
              </div>

              <div className="item ">
                <Link to="/admin/menu" className="admin">
                  Menus & Items
                </Link>
              </div>

              <div className="item ">
                <Link to="/admin/logs" className="admin">
                  Logs
                </Link>
              </div>
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
