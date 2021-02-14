import React from 'react';
import Container from './Container';

class Banner extends React.Component {
  render() {
    return (
      <Container>
        <div className="ui message" style={{ marginTop: '1em' }}>
          <h1 className="ui Huge header centered">Hello, Vendor Name</h1>
        </div>
      </Container>
    );
  }
}

export default Banner;
