import React from 'react';
import Container from './Container';
import Map from './Map';
import CustomerMap from './CustomerMap';

class CustomerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {}
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch('http://localhost:5000/customer/map')
      .then((res) => res.json())
      .then((res) =>
        this.setState(
          {
            apiResponse: res,
            center: {
              lat: res.cart[0].lat,
              lng: res.cart[0].lng
            }
          },
          () => console.log(this.state.apiResponse)
        )
      );
  }

  render() {
    return (
      <div>
        <Container>
          <div
            className="ui huge header centered"
            style={{ marginTop: '2vh', marginBottom: '2vh' }}
          >
            Welcome to the Hot Doggist!
          </div>
        </Container>
        <CustomerMap
          apiResponse={this.state.apiResponse}
          center={this.state.center}
        />
      </div>
    );
  }
}

export default CustomerMain;
