import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useState, useEffect } from "react";
import CheckInButton from "../components/CheckInButton";
import SubmitForm from "../components/SubmitForm";
import "./Map.css";
import L from "leaflet";
import iconColored from "../assets/Images/swing_icon_colored.png";
import iconWhite from "../assets/Images/swing_icon_white.png";
import iconChild from "../assets/Images/child_icon.png";
import "leaflet-loading";
import { ToastContainer, toast } from "react-toast";

export default function Map() {
  const [map, setMap] = useState(null);
  const [playGroundData, setPlayGroundData] = useState([]);
  const locationSearchValue = JSON.parse(localStorage.getItem("inputText"));
  const [playgroundWhereUserIsCheckedIn, setPlaygroundWhereUserIsCheckedIn] =
    useState(null);
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
        map.setView([newLatitude, newLongitude], 15);
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
        if (userStatus.status === "CHECKED-IN") {
          setPlaygroundWhereUserIsCheckedIn(clickedPlayground);
          toast("Eingecheckt", {
            backgroundColor: "#04aa6d",
            color: "#fafcfb",
          });
        } else {
          setPlaygroundWhereUserIsCheckedIn(null);
          toast("Ausgecheckt", {
            backgroundColor: "#dc143c",
            color: "#fafcfb",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getIcon(data) {
    if (data?.checkedIn?.length > 0) {
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
      <ToastContainer position={"bottom-center"} />
      <SubmitForm
        className={"Map__submitform"}
        handleOnSubmit={handleOnSubmit}
      />

      {playgroundWhereUserIsCheckedIn && (
        <button
          className="Map__button--checkout"
          onClick={() => handleCheckButton(playgroundWhereUserIsCheckedIn)}
        >
          CHECK-OUT
        </button>
      )}

      <MapContainer
        className="Map__Mapcontainer"
        tap={false}
        whenCreated={setMap}
        loadingControl={true}
        // center={[48.1047822, 11.5767881]}
        // zoom={5}
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
              icon={getIcon(positionData)}
              key={positionData?._id}
              position={[
                positionData?.geometry?.coordinates[1],
                positionData?.geometry?.coordinates[0],
              ]}
            >
              <Popup className="Map__Popup">
                <>
                  <CheckInButton
                    handleCheckButton={() => handleCheckButton(positionData)}
                    data={positionData}
                    isDisabled={playgroundWhereUserIsCheckedIn ? true : false}
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
                      {positionData?.checkedIn?.length}
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
