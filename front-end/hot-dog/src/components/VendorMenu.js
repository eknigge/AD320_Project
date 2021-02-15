import React from 'react';
import Banner from './Banner';
import Menu from './Menu';

class VendorMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  callAPI() {
    fetch('http://localhost:8000/vendor/menu?id=4')
      .then((res) => res.json())
      .then((res) => {
        this.setState({ apiResponse: res });
        console.log(this.state.apiResponse);
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <Banner vendorName="Steven" />
        <Menu apiResponse={this.state.apiResponse} />
      </div>
    );
  }
}

export default VendorMenu;
