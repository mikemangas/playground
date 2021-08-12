import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";

export default function Home() {
  const [playGroundData, setPlayGroundData] = useState([]);
  const [map, setMap] = useState(null);
  useEffect(() => {
    const url = "/api/playground";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlayGroundData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    const searchInputUrl = `https://nominatim.openstreetmap.org/search?q=${formInputValue}&limit=20&format=json`;
    fetch(searchInputUrl)
      .then((res) => res.json())
      .then((data) => {
        const newLatitude = Number(data[0]?.lat);
        const newLongitude = Number(data[0]?.lon);
        map.flyTo([newLatitude, newLongitude], 15);
      })
      .catch((error) => {
        console.error(error);
      });
    form.reset();
  }

  function handleCheckButton(data) {
    const url = `api/playground/${data._id}`;
    const patchMethodCheckIn = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "HALLO",
      }),
    };

    fetch(url, patchMethodCheckIn)
      .then((res) => {
        res.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          name="searchInput"
          id="searchInput"
          placeholder="PLZ oder Stadteil"
        />
        <button type="submit">SEND</button>
      </form>

      <MapContainer
        whenCreated={setMap}
        center={[48.1047822, 11.5767881]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {playGroundData.map((positionData) => (
            <Marker
              key={positionData?._id}
              position={[
                positionData?.geometry?.coordinates[1],
                positionData?.geometry?.coordinates[0],
              ]}
            >
              <Popup>
                <>
                  <button onClick={() => handleCheckButton(positionData)}>
                    CHECKIN
                  </button>
                  <p>{positionData?.properties?.name}</p>
                </>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
