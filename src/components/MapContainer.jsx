import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function MapContainer({ userLocation }) {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 35.6812,
    lng: 139.7671,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDRvLDO57OsWTczXLlBSVSvJGLuoNLjdm4">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        <Marker position={userLocation} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
