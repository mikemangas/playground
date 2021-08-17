import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import CheckInText from "../components/CheckInText";
import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

export default function Map() {
  const [map, setMap] = useState(null);
  const [playGroundData, setPlayGroundData] = useState([]);
  const [searchState, setSearchState] = useState();
  const localStorageInputText = JSON.parse(localStorage.getItem("inputText"));

  useEffect(() => {
    const url = "/api/playground";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlayGroundData(data);
      })
      .catch((error) => console.error(error));
  }, [searchState, map]);

  useEffect(() => {
    const searchInputUrl = `https://nominatim.openstreetmap.org/search?q=${localStorageInputText}&limit=20&format=json`;
    fetch(searchInputUrl)
      .then((res) => res.json())
      .then((data) => {
        const newLatitude = Number(data[0]?.lat);
        const newLongitude = Number(data[0]?.lon);
        map.setView([newLatitude, newLongitude], 12);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  function handleCheckButton(data) {
    const url = `/api/playground/${data._id}`;
    const patchMethodCheckIn = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem("userId")),
      }),
    };
    fetch(url, patchMethodCheckIn)
      .then((res) => {
        setSearchState(!searchState);
        res.json();
      })
      .catch((error) => {
        console.error(error);
      });

    // if (data?.checkedIn.includes(JSON.parse(localStorage.getItem("userId")))) {
    //   alert("successfully CHECKED-OUT");
    // } else {
    //   alert("successfully CHECKED-IN");
    // }
  }

  return (
    <>
      <section className="mapcontainer">
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
