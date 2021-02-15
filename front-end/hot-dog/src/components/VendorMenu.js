import React from 'react';
import Banner from './Banner';
import Menu from './Menu';

class VendorMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  callAPI() {
    fetch('http://localhost:8000/vendor/menu?id=6')
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
    const { vendorFirstName, vendorLastName } = this.state.apiResponse;
    return (
      <div>
        <Banner vendorName={vendorFirstName + ' ' + vendorLastName} />
        <Menu apiResponse={this.state.apiResponse} />
      </div>
    );
  }
}

export default VendorMenu;
