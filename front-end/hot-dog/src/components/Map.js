import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

// Configs
const mapContainerStyle = {
  width: '100%',
  height: '85vh'
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
  const [newLoc, setNewLoc] = React.useState(null);
  const [selectNew, setSelectNew] = React.useState(null);

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

  const { cart, vendorFirstName, vendorLastName } = props.apiResponse;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={props.center}
        options={options}
        onClick={(event) => {
          setNewLoc({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
          });
          props.onClick({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          });
        }}
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
              icon={props.status ? icon.open : icon.closed}
            ></Marker>
          );
        })}

        {newLoc ? (
          <Marker
            key={`${newLoc.lat}-${newLoc.lng}`}
            position={{ lat: newLoc.lat, lng: newLoc.lng }}
            onClick={() => {
              setSelectNew(newLoc);
            }}
            icon={icon.new}
          />
        ) : null}
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
                <span style={{ color: props.status ? 'green' : 'red' }}>
                  {props.status ? 'Available' : 'Unavailable'}
                </span>
              </p>
            </div>
          </InfoWindow>
        ) : null}
        {selectNew ? (
          <InfoWindow
            position={{ lat: newLoc.lat, lng: newLoc.lng }}
            onCloseClick={() => {
              setSelectNew(null);
            }}
          >
            <div>
              <h3>New Cart Location</h3>

              <p>
                <strong>Latitude:</strong> {newLoc.lat.toFixed(5)}
              </p>
              <p>
                <strong>Longitude:</strong> {newLoc.lng.toFixed(5)}
              </p>
              <p>
                <strong>Time Selected:</strong> {newLoc.time.toLocaleString()}
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
