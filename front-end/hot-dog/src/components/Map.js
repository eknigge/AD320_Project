import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Box from './Box';
import Container from './Container';

// Configs
const mapContainerStyle = {
  width: '100%',
  height: '80vh'
};

const center = {
  lat: 47.606209,
  lng: -122.332069
};

const options = {
  disableDefaultUI: true,
  zoomControl: true
};

// Functional component
export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  });

  const [selected, setSelected] = React.useState(null);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <div>
      <Container>
        <Box>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            options={options}
          >
            <Marker
              key={'1'}
              position={{ lat: 47.6828977, lng: -122.3917439 }}
              icon={{
                url: '/images/hot-dog-stand.svg',
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20)
              }}
              onClick={(anything) => {
                setSelected(this);
              }}
            >
              {selected ? (
                <InfoWindow
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div>
                    <h3>Hot dog Sold Here!</h3>
                    <p>What a time to be alive</p>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
            <Marker
              key={'2'}
              position={{ lat: 47.6124525, lng: -122.3190042 }}
              icon={{
                url: '/images/hot-dog-stand.svg',
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20)
              }}
              onClick={(target) => {
                setSelected(target);
              }}
            >
              {selected ? (
                <InfoWindow
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div>
                    <h3>Hot dog Sold Here!</h3>
                    <p>What a time to be alive</p>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          </GoogleMap>
        </Box>
      </Container>
    </div>
  );
}
