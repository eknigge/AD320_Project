import React from 'react';
import Banner from './Banner';
import Menu from './Menu';

class VendorMenu extends React.Component {
  render() {
    return (
      <div>
        <Banner vendorName="Steven" />
        <Menu />
      </div>
    );
  }
}

export default VendorMenu;
