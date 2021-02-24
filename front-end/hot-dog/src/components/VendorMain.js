import React from 'react';
import Banner from './Banner';
import Container from './Container';
import Map from './Map';
import Box from './Box';

class VendorMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  callAPI() {
    let id = this.props.match.params.id;
    console.log(id);
    fetch(`http://localhost:8000/vendor/${id}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ apiResponse: res }, () => {
          console.log(this.state);
        });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    const { vendorFirstName, vendorLastName } = this.state.apiResponse;
    return (
      <Container>
        <Banner vendorName={`${vendorFirstName} ${vendorLastName}`}></Banner>
        <Box>
          <div className="ui equal width center stackable grid">
            <div className="column">
              <button className="large ui primary button">
                Change availability
              </button>
            </div>
            <div className="column">
              <button
                className="large ui primary button"
                data-tooltip="Click anywhere on the map to place a pin, then click this button (no functionality yet)"
              >
                Change Location
              </button>
            </div>
            <div className="column">
              <button className="large ui primary button">Change Menu</button>
            </div>
          </div>
        </Box>
        <Map apiResponse={this.state.apiResponse} />
      </Container>
    );
  }
}
export default VendorMain;
