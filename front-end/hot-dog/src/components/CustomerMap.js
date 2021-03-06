import React from 'react';
import Container from './Container';
import Map from './Map';

class CustomerMap extends React.Component {
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
        this.setState({ apiResponse: res }, () => console.log(this.state))
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
        {/* TODO: Need to build a custom map for customer view */}
        <Map
          apiResponse={this.state.apiResponse}
          center={{ lat: 47.6062, lng: -122.3321 }}
        />
      </div>
    );
  }
}

export default CustomerMap;
