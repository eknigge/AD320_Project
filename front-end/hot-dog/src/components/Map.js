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

  // Need to set the rendered marker in state first, then refer back to the corresponding marker in state
  // const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  const icon = {
    icon: {
      url: '/images/hot-dog-stand.svg',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 20)
    }
  };

  // mock data to test things out
  const markers = [
    {
      lat: 47.6124525,
      lng: -122.3190042
    },
    {
      lat: 47.6828977,
      lng: -122.3917439
    }
  ];

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
            {markers.map((marker) => {
              return (
                <Marker
                  key={`${marker.lat}-${marker.lng}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={() => {
                    setSelected(marker);
                  }}
                  icon={icon.icon}
                ></Marker>
              );
            })}

            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h3>
                    <span role="img" aria-label="cart">
                      🌭🌭🌭
                    </span>{' '}
                    Hot dogs sold here!
                  </h3>
                  <p>Get your wieners while they're hot</p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </Box>
      </Container>
    </div>
  );
}
