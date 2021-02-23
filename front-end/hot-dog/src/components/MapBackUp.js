import React from 'react';
import Container from './Container';
import Box from './Box';
import InnerMap from './InnerMap';
import { withScriptjs, withGoogleMap } from 'react-google-maps';

const WrappedMap = withScriptjs(withGoogleMap(InnerMap));

class Map extends React.Component {
  render() {
    return (
      <Container>
        <div style={{ width: '800px', height: '500px' }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          ></WrappedMap>
        </div>
      </Container>
    );
  }
}

export default Map;
