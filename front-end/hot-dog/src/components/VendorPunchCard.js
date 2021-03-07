import React from 'react';
import Container from './Container';
import Banner from './Banner';
import PunchCard from './PunchCard';

class VendorPunchCard extends React.Component {
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
    fetch(`http://localhost:5000/vendor/`)
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res, dataReceived: true }))
      .catch((err) => console.log(err));
  }

  renderPunchCards() {
    if (this.state.dataReceived) {
      return this.state.apiResponse.map((vendor) => (
        <PunchCard
          key={vendor.USER_ID}
          name={`${vendor.First_Name} ${vendor.Last_Name}`}
          url={`/vendor/${vendor.USER_ID}`}
        />
      ));
    } else {
      return <p>Data is loading...</p>;
    }
  }

  render() {
    return (
      <Container>
        <Banner vendorName="please punch in to get started"></Banner>
        <div className="ui message">
          <p>
            Welcome to the world's most innovative digital punch card system!
          </p>
          <p>
            Please select ONLY your own name... but no one's stopping you from
            messing around with other people's cart and menu 🤡
          </p>
        </div>
        <div className="ui divided items">{this.renderPunchCards()}</div>
      </Container>
    );
  }
}

export default VendorPunchCard;
