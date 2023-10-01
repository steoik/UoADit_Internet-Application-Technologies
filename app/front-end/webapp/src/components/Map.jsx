// Map.js
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useState } from 'react';

function MapContainer(props) {

  const [coords, setCoords] = useState({ lat: props.lat, lng: props.lng });

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const onMarkerDragend = (t, map, coords) => {
    setCoords({
      lat: coords.latLng.lat(),
      lng: coords.latLng.lng(),
    });
    if (props.onMarkerDrag) {
      props.onMarkerDrag({
        lat: coords.latLng.lat(),
        lng: coords.latLng.lng(),
      });
    }
  };

  return (
    <Map
      google={props.google}
      zoom={18}
      style={mapStyles}
      initialCenter={coords}
      >
      {props.onMarkerDrag ? (
        <Marker
          position={coords}
          title="Marker"
          name="Marker"
          draggable={true}
          onDragend={onMarkerDragend}
        />
        ) :
        <Marker
          position={coords}
          title="Marker"
          name="Marker"
        />
      }
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZLA7NswAnINHDOJ4FNWvioK8inexGV3E',
})(MapContainer);
