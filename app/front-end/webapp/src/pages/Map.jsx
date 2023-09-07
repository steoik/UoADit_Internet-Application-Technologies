// Map.js
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function MapContainer(props) {

  const { lat, lng } = props;

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <Map
      google={props.google}
      zoom={18}
      style={mapStyles}
      initialCenter={{
        lat: lat,
        lng: lng,
      }}
      >
      <Marker
        position={{
          lat: lat,
          lng: lng,
        }}
        title="Marker"
        name="Marker"
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZLA7NswAnINHDOJ4FNWvioK8inexGV3E',
})(MapContainer);
