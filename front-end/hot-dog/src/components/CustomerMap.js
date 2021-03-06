import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Search from './Search';
import Locate from './Locate';

// Configs
const mapContainerStyle = {
  width: '100%',
  height: '85vh'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true
};

const libraries = ['places'];

export default function CustomerMap(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

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
    },
    new: {
      url: '/images/new.svg',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 20)
    }
  };

  const { cart } = props.apiResponse;

  return (
    <div style={{ marginTop: '-8vh' }}>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={props.center}
        options={options}
        onLoad={onMapLoad}
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
              icon={marker.Available ? icon.open : icon.closed}
            ></Marker>
          );
        })}

        {/* TODO: change the info window to display menu info */}
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
                {`${selected.First_Name} ${selected.Last_Name}`}'s Hot Dog Cart
              </h3>
              <p>Cart ID: {selected.Cart_ID}</p>
              <p>Menu ID: {selected.Menu_ID}</p>
              <p>
                Status:{' '}
                <span style={{ color: selected.Available ? 'green' : 'red' }}>
                  {selected.Available ? 'Available' : 'Unavailable'}
                </span>
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
