import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useState, useEffect } from "react";
import CheckinButton from "../components/CheckInButton";
import SubmitForm from "../components/SubmitForm";

export default function Map() {
  const [map, setMap] = useState(null);
  const [playGroundData, setPlayGroundData] = useState([]);
  const locationSearchValue = JSON.parse(localStorage.getItem("inputText"));
  const [
    playgroundWhereUserIsCheckedIn,
    setPlaygroundWhereUserIsCheckedIn,
  ] = useState(null);
  const [updatePage, setUpdatePage] = useState();

  const userId = JSON.parse(localStorage.getItem("userId"));

  // Fetch playgrounds
  useEffect(() => {
    const url = "/api/playground";
    fetch(url)
      .then((res) => res.json())
      .then((allPlaygrounds) => {
        // Check if user is in any playground
        const checkedPlayground = allPlaygrounds.find((playground) => {
          return playground.checkedIn.includes(userId);
        });
        setPlaygroundWhereUserIsCheckedIn(checkedPlayground);
        setPlayGroundData(allPlaygrounds);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  // Fetch coordinates for given zipcode
  useEffect(() => {
    const searchInputUrl = `https://nominatim.openstreetmap.org/search?q=${locationSearchValue}&limit=20&format=json`;
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
  }, [locationSearchValue, map]);

  function handleCheckButton(clickedPlayground) {
    const url = `/api/playground/${clickedPlayground?._id}`;
    const patchMethodCheckIn = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
      }),
    };
    fetch(url, patchMethodCheckIn)
      .then((res) => {
        return res.json();
      })
      .then((userStatus) => {
        console.log(userStatus);
        if (userStatus.status === "CHECKED-IN") {
          setPlaygroundWhereUserIsCheckedIn(clickedPlayground);
        } else {
          setPlaygroundWhereUserIsCheckedIn(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    localStorage.setItem("inputText", JSON.stringify(formInputValue));
    form.reset();
    setUpdatePage(!updatePage);
  }

  return (
    <>
      <SubmitForm handleOnSubmit={handleOnSubmit} />

      {playgroundWhereUserIsCheckedIn && (
        <button
          onClick={() => handleCheckButton(playgroundWhereUserIsCheckedIn)}
        >
          CHECK-OUT
        </button>
      )}
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
                    <CheckinButton
                      handleCheckButton={() => handleCheckButton(positionData)}
                      data={positionData}
                      isDisabled={playgroundWhereUserIsCheckedIn ? true : false}
                    />
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
