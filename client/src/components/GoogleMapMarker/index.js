import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const GoogleMapMarker = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={props.position}
  >
    {props.isMarkerShown && <Marker position={props.position} />}
  </GoogleMap>
))

export default GoogleMapMarker;