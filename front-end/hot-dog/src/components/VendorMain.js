import React from 'react';
import Banner from './Banner';
import Container from './Container';

class VendorMain extends React.Component {
  render() {
    return (
      <Container>
        <Banner vendorName="Greatest Hot Dog Seller on Earth!"></Banner>
      </Container>
    );
  }
}
export default VendorMain;
