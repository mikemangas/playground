import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

export default function Home() {
  const [playgrounds, setPlaygrounds] = useState([]);

  useEffect(() => {
    const url = `https://playground-check.herokuapp.com/api/playground`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlaygrounds(data);
      })
      .catch((error) => console.error("something went wrong"));
  }, []);

  return (
    <div>
      <form>
        <input name="plz" id="plz" placeholder="deine PLZ" />
        <button type="submit">Send</button>
      </form>

      <MapContainer
        center={[48.1047822, 11.5767881]}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {playgrounds.map((positionData) => (
          <Marker
            key={positionData?._id}
            position={[
              positionData?.geometry?.coordinates[1],
              positionData?.geometry?.coordinates[0],
            ]}
          >
            <Popup>
              <>
                <button>CHECK-IN</button>
                <p>{positionData?.properties?.name}</p>
              </>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
