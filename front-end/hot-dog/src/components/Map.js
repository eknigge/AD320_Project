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
  height: '75vh'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true
};

// Functional component
export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  });

  const [selected, setSelected] = React.useState(null);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  const icon = {
    open: {
      url: '/images/hot-dog-stand.svg',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 20)
    },
    closed: {
      url: '/images/closed.svg',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 20)
    }
  };

  const { cart, vendorFirstName, vendorLastName } = props.apiResponse;
  const centerPos = { lat: cart?.[0]?.lat, lng: cart?.[0]?.lng };

  return (
    <div>
      <Container>
        <Box>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={centerPos}
            options={options}
          >
            {cart?.map((marker) => {
              return (
                <Marker
                  key={`${marker.lat}-${marker.lng}`}
                  position={{
                    lat: marker.lat,
                    lng: marker.lng
                  }}
                  onClick={() => {
                    setSelected(marker);
                  }}
                  icon={marker.available ? icon.open : icon.closed}
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
                      🌭
                    </span>{' '}
                    {`${vendorFirstName} ${vendorLastName}`}'s Hot Dog Cart
                  </h3>
                  <p>Cart ID: {selected.id}</p>
                  <p>Menu ID: {selected.menuID}</p>
                  <p>
                    Status:{' '}
                    <span
                      style={{ color: selected.available ? 'green' : 'red' }}
                    >
                      {selected.available ? 'Available' : 'Unavailable'}
                    </span>
                  </p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </Box>
      </Container>
    </div>
  );
}
