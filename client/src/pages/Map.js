import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import CheckInText from "../components/CheckInText";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Map() {
  const [map, setMap] = useState();
  const [playGroundData, setPlayGroundData] = useState([]);
  const [checkStatus, setCheckStatus] = useState();
  const { searchparams } = useParams();

  useEffect(() => {
    const url = "/api/playground";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlayGroundData(data);
      })
      .catch((error) => console.error(error));
  }, [checkStatus, searchparams, map]);

  useEffect(() => {
    const searchInputUrl = `https://nominatim.openstreetmap.org/search?q=${searchparams}&limit=20&format=json`;
    fetch(searchInputUrl)
      .then((res) => res.json())
      .then((data) => {
        const newLatitude = Number(data[0]?.lat);
        const newLongitude = Number(data[0]?.lon);
        map.setView([newLatitude, newLongitude], 13);
      })
      .catch((error) => {
        console.error(error);
      });
  });

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
        map.setView([newLatitude, newLongitude], 13);
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
        userId: JSON.parse(localStorage.getItem("userId")),
      }),
    };
    fetch(url, patchMethodCheckIn)
      .then((res) => {
        setCheckStatus(!checkStatus);
        res.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <label for="searchInput">PLZ oder Stadteil</label>
        <input name="searchInput" id="searchInput" />
        <button type="submit">SEND</button>
      </form>

      <section className="mapcontainer">
        <MapContainer
          whenCreated={setMap}
          center={[48.1047822, 11.5767881]}
          zoom={5}
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
                      <CheckInText
                        hasId={positionData?.checkedIn.includes(
                          JSON.parse(localStorage.getItem("userId"))
                        )}
                        data={positionData}
                      />
                    </button>
                    <p>{positionData?.properties?.name}</p>
                  </>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </section>
    </>
  );
}
