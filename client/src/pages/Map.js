import { useState, useEffect } from "react";
import CheckInButton from "../components/CheckInButton";
import SubmitForm from "../components/SubmitForm";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./Map.css";
import L from "leaflet";
import iconColored from "../assets/Images/swing_icon_colored.png";
import iconWhite from "../assets/Images/swing_icon_white.png";
import iconChild from "../assets/Images/child_icon.png";
import "leaflet-loading";

export default function Map() {
  const locationSearchValue = JSON.parse(localStorage.getItem("inputText"));
  const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
  const [updatePage, setUpdatePage] = useState();
  const [map, setMap] = useState(null);
  const [playGroundData, setPlayGroundData] = useState([]);
  const [dbUserId, setDbUserId] = useState(null);
  const [playgroundWhereUserIsCheckedIn, setPlaygroundWhereUserIsCheckedIn] =
    useState(null);

  useEffect(() => {
    const url = "/api/playground";
    fetch(url)
      .then((res) => res.json())
      .then((allPlaygrounds) => {
        setPlayGroundData(allPlaygrounds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const searchInputUrl = `https://nominatim.openstreetmap.org/search?q=${locationSearchValue}&limit=20&format=json`;
    fetch(searchInputUrl)
      .then((res) => res.json())
      .then((data) => {
        const newLatitude = Number(data[0]?.lat);
        const newLongitude = Number(data[0]?.lon);
        map.setView([newLatitude, newLongitude], 15);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [locationSearchValue, map]);

  useEffect(() => {
    const url = `/api/user/${localStorageUserId}`;
    fetch(url)
      .then((res) => res.json())
      .then((checkedInUser) => {
        setDbUserId(checkedInUser?.checkedInUserMongoId);
        setPlaygroundWhereUserIsCheckedIn(checkedInUser?.checkedInPlayground);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [localStorageUserId, updatePage]);

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    localStorage.setItem("inputText", JSON.stringify(formInputValue));
    form.reset();
    setUpdatePage(!updatePage);
  }

  function getIcon(allPlaygrounds) {
    if (allPlaygrounds > 0) {
      return L.icon({
        iconUrl: iconColored,
        iconSize: [50, 50],
      });
    } else {
      return L.icon({
        iconUrl: iconWhite,
        iconSize: [50, 50],
      });
    }
  }

  function handleCheckInButton(clickedPlayground) {
    const urlPlayground = `/api/playground/${clickedPlayground?._id}`;
    const patchMethodCheckin = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorageUserId,
      }),
    };
    fetch(urlPlayground, patchMethodCheckin)
      .then((res) => {
        res.json();
      })
      .then(() => {
        setUpdatePage(!updatePage);
      });
  }

  function handleCheckOutButton() {
    const urlPlayground = `/api/playground/${playgroundWhereUserIsCheckedIn}`;
    const patchMethodCheckin = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorageUserId,
      }),
    };
    fetch(urlPlayground, patchMethodCheckin)
      .then((res) => {
        res.json();
      })
      .then(() => {
        setUpdatePage(!updatePage);
      });
  }

  return (
    <>
      <SubmitForm
        className={"Map__submitform"}
        handleOnSubmit={handleOnSubmit}
      />

      {dbUserId && (
        <button
          className="Map__button--checkout"
          onClick={() => handleCheckOutButton()}
        >
          CHECK-OUT
        </button>
      )}

      <MapContainer
        className="Map__Mapcontainer"
        tap={false}
        whenCreated={setMap}
        loadingControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {playGroundData.map((positionData) => (
            <Marker
              className="Map__Marker"
              icon={getIcon(positionData.userCounter)}
              key={positionData?._id}
              position={[
                positionData?.geometry?.coordinates[1],
                positionData?.geometry?.coordinates[0],
              ]}
            >
              <Popup className="Map__Popup">
                <>
                  <CheckInButton
                    handleCheckInButton={() =>
                      handleCheckInButton(positionData)
                    }
                    data={positionData}
                    isDisabled={dbUserId ? true : false}
                    className={"Map__button--checkin"}
                  />
                  <p>{positionData?.properties?.name}</p>
                  <div className="Map__Popup__childcounter__wrapper">
                    <img
                      className="Map__Popup__child-icon"
                      src={iconChild}
                      alt="child-counter"
                    />
                    <p className="Map__Popup__childnumber">
                      {positionData?.userCounter}
                    </p>
                  </div>
                </>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}
