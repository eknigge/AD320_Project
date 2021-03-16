import React from 'react';
import Banner from './Banner';
import Container from './Container';
import Map from './Map';
import Box from './Box';
import { Link } from 'react-router-dom';

class VendorMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      newLocation: {}
    };
  }

  callAPI() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:5000/vendor/${id}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          apiResponse: res,
          available: res.cart[0].available,
          center: { lat: res.cart[0].lat, lng: res.cart[0].lng },
          error: false
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          apiResponse: {
            vendorFirstName: 'something went wrong',
            vendorLastName: ''
          },
          error: true,
          message:
            'Please make sure you have valid permission and the correct vendor ID'
        });
      });
  }

  componentDidMount() {
    this.callAPI();
  }

  updateStatus = () => {
    let id = this.props.match.params.id;
    this.setState({ available: !this.state.available }, () => {
      fetch(`http://localhost:5000/vendor/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reqType: 'status',
          cartID: this.state.apiResponse.cart[0].id,
          status: this.state.available
        })
      })
        .then((res) => res.text())
        .then((res) => console.log(res))
        .catch((err) => console.err(err));
    });
  };

  getNewLocation(newLoc) {
    this.setState({ newLocation: newLoc });
  }

  updateLocation = () => {
    let id = this.props.match.params.id;
    fetch(`http://localhost:5000/vendor/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reqType: 'location',
        cartID: this.state.apiResponse.cart[0].id,
        newLocation: `${this.state.newLocation.lat},${this.state.newLocation.lng}`
      })
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => console.err(err));

    // there must be a better way to re-render the map besides hard refreshing
    window.location.reload();
  };

  render() {
    const { vendorFirstName, vendorLastName } = this.state.apiResponse;
    let cartID;
    if(this.state.apiResponse.cart !== undefined ){
      cartID = this.state.apiResponse.cart[0].id;
    } else {
      cartID = 0;
    }
    return (
      <Container>
        <Banner vendorName={`${vendorFirstName} ${vendorLastName}`}></Banner>
        <Box>
          <div className="ui equal width center stackable grid">
            <div className="column">
              <Link to="/">
                <button className="large ui blue button">
                  <p>Home</p>
                </button>
              </Link>
            </div>
            <div className="column">
              <Link to="/vendor">
                <button className="ui large button">
                  <p>Punch out</p>
                </button>
              </Link>
            </div>
            <div className="column">
              <button
                className={`large ui button ${
                  this.state.available ? 'teal' : 'green'
                }`}
                onClick={this.updateStatus}
                disabled={this.state.error}
              >
                Currently {this.state.available ? 'Working' : 'Offline'}, Go
                {` ${this.state.available ? 'home' : 'to work'}`}
              </button>
            </div>
            <div className="column">
              <button
                className="large ui blue button"
                data-tooltip="Click anywhere on the map to place a pin, then click this button"
                onClick={this.updateLocation}
                disabled={this.state.error || !this.state.newLocation.lat}
              >
                Change Location
              </button>
            </div>
            <div className="column">
              <Link to={`/vendor/orders/${cartID}`}>
                <button
                  className="large ui blue button"
                >
                  Manage Orders
                </button>
              </Link>
            </div>
            <div className="column">
              <Link to={`/vendor/menu/${this.props.match.params.id}`}>
                <button
                  className="large ui blue button"
                  disabled={this.state.error}
                >
                  Edit Menu Items
                </button>
              </Link>
            </div>
          </div>
        </Box>
        {this.state.error ? (
          <div className="ui message center">
            <h3>{this.state.message}</h3>
          </div>
        ) : (
          <Map
            apiResponse={this.state.apiResponse}
            status={this.state.available}
            center={this.state.center}
            onClick={this.getNewLocation.bind(this)}
          />
        )}
      </Container>
    );
  }
}
export default VendorMain;
