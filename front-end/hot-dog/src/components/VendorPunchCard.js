import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import Banner from './Banner';
import PunchCard from './PunchCard';

class VendorPunchCard extends React.Component {
  render() {
    return (
      <Container>
        <Banner vendorName="please select your punch card to get started"></Banner>
        <div className="ui divided items">
          <PunchCard name="Bobby Flay" />

          <PunchCard name="Gordan Ramsey" />
        </div>
      </Container>
    );
  }
}

export default VendorPunchCard;
