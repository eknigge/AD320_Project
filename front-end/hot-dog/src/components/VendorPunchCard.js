import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import Banner from './Banner';

class VendorPunchCard extends React.Component {
  render() {
    return (
      <Container>
        <Banner vendorName="please select your punch card to get started"></Banner>
        <div className="ui special cards">
          <div className="card">
            <div className="blurring dimmable image">
              <div className="ui dimmer">
                <div className="content">
                  <div className="center">
                    <div className="ui inverted button">Punch in</div>
                  </div>
                </div>
              </div>
              <img
                // why is this shit not working?
                src={process.env.PUBLIC_URL + '/images/bobby.jpg'}
                alt="bob"
              ></img>
            </div>
            <div className="content">
              <a href="#" className="header">
                Bob
              </a>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default VendorPunchCard;
