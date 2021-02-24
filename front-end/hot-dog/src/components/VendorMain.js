import React from 'react';
import Banner from './Banner';
import Container from './Container';
import Map from './Map';

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
    return (
      <Container>
        <Banner vendorName="Greatest Hot Dog Seller on Earth!"></Banner>
        <Map apiResponse={this.state.apiResponse} />
      </Container>
    );
  }
}
export default VendorMain;
