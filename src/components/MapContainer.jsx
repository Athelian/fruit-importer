import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import userPop from "./userPop";
import rambutan from "../icons/rambutan.png";
import crab from "../icons/crab.png";
import durian from "../icons/durian.png";
import jackfruit from "../icons/jackfruit.png";
import dragonfruit from "../icons/dragonfruit.png";
import "./map.css";

function MapContainer({ userData }) {
  const [markers, setMarkers] = useState(null);
  const [center, setCenter] = useState({
    lat: 35.6812, //Tokyo station as default (in case geolocator fails)
    lng: 139.7671,
  });

  // Run after userLocations updated, ensure that location is on land by
  // using a map of Japan and checking if the coordinate falls outside the border
  useEffect(() => {
    const iconDict = {
      crab: crab,
      rambutan: rambutan,
      durian: durian,
      dragonfruit: dragonfruit,
      jackfruit: jackfruit,
    };
    if (userData) {
      (async () =>
        setMarkers(
          await Promise.all(
            userData.map(async (user) => {
              const data = await axios.get(
                `https://koordinates.com/services/query/v1/vector.json?key=8145216c6fcf4f6881103c1c773e4dc9&layer=1103&x=${user.lng}&y=${user.lat}&max_results=1&radius=1&geometry=true&with_field_names=true`
              );
              let icon;

              if (
                JSON.parse(data.request.response).vectorQuery.layers[1103]
                  .features.length
              ) {
                icon = iconDict[user.choice];
                return (
                  <Marker
                    icon={icon}
                    position={{ lat: user.lat, lng: user.lng }}
                    onMouseOver={() => {
                      userPop(user);
                    }}
                  ></Marker>
                );
              }
              return;
            })
          )
        ))();
    }
  }, [userData]);

  // Find the location of the user
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setCenter({ lat: 34.6812, lng: 139.7671 });
    }
  }, []);

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    setCenter({ lat: lat, lng: lng }); // Set the location of the user as the center
  }

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDRvLDO57OsWTczXLlBSVSvJGLuoNLjdm4">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
        <InfoWindow position={center}>
          <div className="poop">IWJIASDJ</div>
        </InfoWindow>
        {markers ? markers : null}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
