import React from 'react';
import Container from './Container';

class Banner extends React.Component {
  render() {
    return (
      <Container>
        <div className="ui message" style={{ marginTop: '1em' }}>
          <h1 className="ui huge header centered">
            Hello, {this.props.vendorName}
          </h1>
        </div>
      </Container>
    );
  }
}

export default Banner;
