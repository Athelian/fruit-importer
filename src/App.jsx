import "./App.css";
import MapContainer from "./components/MapContainer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(null);

  // Begin app by getting 100 pins for the map
  useEffect(() => {
    (async () => {
      setUserData(
        JSON.parse((await axios.get("/api/user-data")).request.response)
      );
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <MapContainer userData={userData}></MapContainer> :
      </header>
    </div>
  );
}

export default App;
