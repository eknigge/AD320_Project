import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import '@reach/combobox/styles.css';

export default function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestion
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 47.6062, lng: () => -122.3321 },
      radius: 200 * 1000
    }
  });

  return (
    <div className="search">
      <Combobox
        onSelect={(address) => {
          // TODO: change stuff here
          console.log(address);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Search for your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
