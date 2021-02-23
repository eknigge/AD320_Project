import React from 'react';
import Banner from './Banner';
import Container from './Container';
import Map from './Map';

class VendorMain extends React.Component {
  render() {
    return (
      <Container>
        <Banner vendorName="Greatest Hot Dog Seller on Earth!"></Banner>
        <Map />
      </Container>
    );
  }
}
export default VendorMain;
