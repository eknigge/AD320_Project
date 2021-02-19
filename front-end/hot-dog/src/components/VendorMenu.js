import React from 'react';
import Banner from './Banner';
import Menu from './Menu';
import Container from './Container';

class VendorMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  callAPI() {
<<<<<<< HEAD
    fetch('http://localhost:8000/vendor/menu?id=4')
=======
    // User id and permission
    // 1 - customer
    // 2 - customer
    // 3 - vendor
    // 4 - vendor
    // 5 - admin
    // 6 - vendor
    // 7 - vendor

    fetch('http://localhost:8000/vendor/menu?id=7')
>>>>>>> 2a5a459... added comments for semantic ui and back end
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

  errorHandling() {
    if (this.state.apiResponse.error) {
      return (
        <Container>
          <div className="ui message">
            <h1 className="ui centered header">Error</h1>
          </div>
        </Container>
      );
    } else {
      const { vendorFirstName, vendorLastName } = this.state.apiResponse;
      return <Banner vendorName={vendorFirstName + ' ' + vendorLastName} />;
    }
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <Banner vendorName="Steven" />
=======
        {this.errorHandling()}
>>>>>>> d4060eb... added error handing for showing vendor menu
        <Menu apiResponse={this.state.apiResponse} />
      </div>
    );
  }
}

export default VendorMenu;
