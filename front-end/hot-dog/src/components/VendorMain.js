import React from 'react';
import Banner from './Banner';
import Container from './Container';
import Map from './Map';
import Box from './Box';
import { Link } from 'react-router-dom';

class VendorMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  callAPI() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:8000/vendor/${id}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            apiResponse: res,
            available: res.cart[0].available,
            center: { lat: res.cart[0].lat, lng: res.cart[0].lng }
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.callAPI();
  }

  updateStatus = () => {
    this.setState({ available: !this.state.available });
  };

  render() {
    const { vendorFirstName, vendorLastName } = this.state.apiResponse;
    return (
      <Container>
        <Banner vendorName={`${vendorFirstName} ${vendorLastName}`}></Banner>
        <Box>
          <div className="ui equal width center stackable grid">
            <div className="column">
              <button
                className={`large ui button ${
                  this.state.available ? 'teal' : 'green'
                }`}
                onClick={this.updateStatus}
              >
                Currently {this.state.available ? 'Working' : 'Offline'}, Go
                {` ${this.state.available ? 'home' : 'to work'}`}
              </button>
            </div>
            <div className="column">
              <button
                className="large ui blue button"
                data-tooltip="Click anywhere on the map to place a pin, then click this button (no functionality yet)"
              >
                Change Location
              </button>
            </div>
            <div className="column">
              <Link to={`/vendor/menu/${this.props.match.params.id}`}>
                <button className="large ui blue button">
                  Edit Menu Items
                </button>
              </Link>
            </div>
          </div>
        </Box>
        <Map
          apiResponse={this.state.apiResponse}
          status={this.state.available}
          center={this.state.center}
        />
      </Container>
    );
  }
}
export default VendorMain;
