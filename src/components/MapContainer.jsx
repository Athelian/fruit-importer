import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import axios from "axios";
import rambutan from "../icons/rambutan.png";
import crab from "../icons/crab.png";
import durian from "../icons/durian.png";
import jackfruit from "../icons/jackfruit.png";
import dragonfruit from "../icons/dragonfruit.png";
import userIcon from "../icons/user.png";
import "./map.css";

function MapContainer({ userData }) {
  const [markers, setMarkers] = useState(null);
  const [windows, setWindows] = useState(null);
  const [relationLines, setRelationLines] = useState(null);
  const [center, setCenter] = useState({
    lat: 35.6812, //Tokyo station as default (in case geolocator fails)
    lng: 139.7671,
  });

  // Run after userLocations updated, ensure that location is on land by
  // using a map of Japan and checking if the coordinate falls outside the border
  useEffect(() => {
    const userGroups = {
      crab: [],
      rambutan: [],
      durian: [],
      dragonfruit: [],
      jackfruit: [],
    };
    const choiceCoords = {
      crab: [],
      rambutan: [],
      durian: [],
      dragonfruit: [],
      jackfruit: [],
    };
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
                choiceCoords[user.choice].push({
                  // Push coords of choice
                  lat: user.lat,
                  lng: user.lng,
                });
                return (
                  <Marker
                    icon={icon}
                    position={{ lat: user.lat, lng: user.lng }}
                    onMouseOver={() => {
                      setWindows(
                        <InfoWindow
                          position={{ lat: user.lat + 0.006, lng: user.lng }}
                          onCloseClick={() => setWindows(null)}
                          className={user.choice}
                        >
                          <div className="user-info">
                            名前:　{user.name}
                            <br />
                            住所:　{user.address}
                            <br />
                            欲しいフルーツくん:　{user.choice}
                            <br />
                            --- Click the Fruit to Join! ---
                            <br />
                            <div className="user-group">
                              {(() => {
                                const users = [];
                                for (const user of userGroups[user.choice]) {
                                  users.push(user);
                                  users.push(<br />);
                                }
                                return users;
                              })()}
                            </div>
                          </div>
                        </InfoWindow>
                      );
                      const originCoords = { lat: user.lat, lng: user.lng };
                      const relationCoords = [];
                      (() => {
                        for (const coords of choiceCoords[user.choice]) {
                          if (coords !== originCoords) {
                            relationCoords.push(coords);
                          }
                        }
                      })();
                      const relationLines = [];
                      (() => {
                        for (const relationCoord of relationCoords) {
                          relationLines.push(
                            <Polyline
                              path={[
                                {
                                  lat: originCoords.lat + 0.0035,
                                  lng: originCoords.lng,
                                },
                                {
                                  lat: relationCoord.lat + 0.0035,
                                  lng: relationCoord.lng,
                                },
                              ]}
                              options={{
                                strokeOpacity: 0,
                                icons: [
                                  {
                                    offset: "0",
                                    repeat: "20px",
                                    icon: {
                                      path: "M 0,-1 0,1",
                                      strokeOpacity: 1,
                                      scale: 3,
                                    },
                                  },
                                ],
                              }}
                            />
                          );
                        }
                      })();
                      setRelationLines(relationLines);
                    }}
                    onMouseOut={() => {
                      setWindows(null);
                      setRelationLines(null);
                    }}
                    onClick={() => {
                      userGroups[user.choice].push("Eliot");
                      setWindows(
                        <InfoWindow
                          position={{ lat: user.lat + 0.006, lng: user.lng }}
                          onCloseClick={() => setWindows(null)}
                          className={user.choice}
                        >
                          <div className="user-info">
                            名前:　{user.name}
                            <br />
                            住所:　{user.address}
                            <br />
                            欲しいフルーツくん:　{user.choice}
                            <br />
                            --- Click the Fruit to Join! ---
                            <br />
                            <div className="user-group">
                              {(() => {
                                const users = [];
                                for (const user of userGroups[user.choice]) {
                                  users.push(user);
                                  users.push(<br />);
                                }
                                return users;
                              })()}
                            </div>
                          </div>
                        </InfoWindow>
                      );
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
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(showPosition);
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
        {relationLines}
        {windows}
        {markers}
        <Marker position={center} icon={userIcon}></Marker>
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
