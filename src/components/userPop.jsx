import React from "react";
import { InfoBox } from "@react-google-maps/api";

export default function userPop(user) {
  return (
    <InfoBox position={{ lat: user.lat + 0.00001, lng: user.lng }}>
      <div>HIHIHIIH</div>
    </InfoBox>
  );
}
