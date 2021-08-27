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
import toast, { Toaster } from "react-hot-toast";

export default function Map({ checkInState, checkOutState }) {
  const locationSearchValue = JSON.parse(localStorage.getItem("inputText"));
  const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
  const [updatePage, setUpdatePage] = useState();
  const [map, setMap] = useState(null);
  const [playGroundData, setPlayGroundData] = useState([]);
  const [dbUserId, setDbUserId] = useState(null);

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
  //i could add "updatePage, checkOutState" inside the useeffect, in order to update the counter immediately
  //but it would rerender the whole map (very bad for performance)

  useEffect(() => {
    const searchInputUrl = `https://nominatim.openstreetmap.org/search?q=${locationSearchValue}&limit=20&format=json`;
    fetch(searchInputUrl)
      .then((res) => res.json())
      .then((searchedLocationData) => {
        if (searchedLocationData.length > 0) {
          const newLatitude = Number(searchedLocationData[0]?.lat);
          const newLongitude = Number(searchedLocationData[0]?.lon);
          map.setView([newLatitude, newLongitude], 15);
        } else {
          toast.error(
            "Leider konnten wir mit deiner Suchanfrage nichts finden. Versuche es nochmal."
          );
        }
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
        checkInState(dbUserId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbUserId, checkOutState, localStorageUserId, updatePage, checkInState]);

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
        toast.success(
          "Erfolgreich eingecheckt. Bitte denke daran dich wieder auszuchecken, wenn du den Spielplatz verlässt. Ansonsten werden wir es für dich automatisch nach 3 Stunden tun.",
          {
            duration: 8000,
          }
        );
      })
      .catch((error) => {
        toast.error(
          "Ups, leider ist beim einchecken etwas schief gelaufen. Versuche es noch einmal."
        );
        console.error(error);
      });
  }

  return (
    <>
      <Toaster />
      <SubmitForm
        className={"Map__submitform"}
        handleOnSubmit={handleOnSubmit}
      />

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
              position={
                positionData?.geometry?.type === "Point"
                  ? [
                      positionData?.geometry?.coordinates[1],
                      positionData?.geometry?.coordinates[0],
                    ]
                  : positionData?.geometry?.type === "Polygon"
                  ? [
                      positionData?.geometry?.coordinates[0][1][1],
                      positionData?.geometry?.coordinates[0][1][0],
                    ]
                  : false
              }
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

                  {positionData?.properties?.name ? (
                    <p>{positionData?.properties?.name}</p>
                  ) : (
                    false
                  )}
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
