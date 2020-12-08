import "./App.css";
import MapContainer from "./components/MapContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MapContainer
          userLocation={{ lat: 35.6812, lng: 139.7671 }}
        ></MapContainer>
      </header>
    </div>
  );
}

export default App;
