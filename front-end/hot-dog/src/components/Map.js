import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
// const API_KEY = process.env.MAP_API;

const mapStyles = {
  width: '80%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'API KEY GOES HERE'
})(MapContainer);
