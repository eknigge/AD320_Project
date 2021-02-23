import React from 'react';
// const API_KEY = process.env.MAP_API;
import Container from './Container';
import Box from './Box';
import { GoogleMap } from 'react-google-maps';

class InnerMap extends React.Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 47.606209, lng: -122.332069 }}
      ></GoogleMap>
    );
  }
}

export default InnerMap;
