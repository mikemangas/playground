import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import toast from "react-hot-toast";
import helmet from "../hooks/helmet";
import defaultVisitsPatch from "../hooks/defaultVisitsPatch";

export default function Map({ checkInState, checkOutState }) {
  const locationSearchValue = JSON.parse(sessionStorage.getItem("inputText"));
  const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
  const [updatePage, setUpdatePage] = useState();
  const [map, setMap] = useState(null);
  const [playGroundData, setPlayGroundData] = useState([]);
  const [dbUserId, setDbUserId] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  let { latparams, lonparams } = useParams();
  const numberLatParams = Number(latparams);
  const numberLonParams = Number(lonparams);

  function setViewFunction() {
    map.setView([numberLatParams, numberLonParams], 20);
  }

  async function callSetViewFunction() {
    try {
      await setViewFunction();
    } catch {
      console.log("something went wrong calling ing the callSetViewFunction");
    }
  }

  useEffect(() => {
    const searchInputUrl = `https://nominatim.openstreetmap.org/search?q=${locationSearchValue}&limit=20&format=json`;
    if (locationSearchValue) {
      fetch(searchInputUrl)
        .then((res) => res.json())
        .then((searchedLocationData) => {
          if (searchedLocationData.length > 0) {
            const newLatitude = Number(searchedLocationData[0]?.lat);
            const newLongitude = Number(searchedLocationData[0]?.lon);
            setLat(newLatitude);
            setLon(newLongitude);
            map.setView([newLatitude, newLongitude], 16);
          } else {
            toast.error(
              "Leider konnten wir mit deiner Suchanfrage nichts finden. Versuche es nochmal."
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (numberLonParams) {
      callSetViewFunction();
      setLat(numberLatParams);
      setLon(numberLonParams);
    }
  }, [locationSearchValue, map]);

  useEffect(() => {
    const url = `/api/playground/${lon}/${lat}`;
    fetch(url)
      .then((res) => res.json())
      .then((allPlaygrounds) => {
        setPlayGroundData(allPlaygrounds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [lat, lon, numberLatParams]);

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

  useEffect(() => {
    defaultVisitsPatch("615af599ff20382e9dd25aab");
    defaultVisitsPatch("615af5a7ff20382e9dd25aac");
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    sessionStorage.setItem("inputText", JSON.stringify(formInputValue));
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
          "Erfolgreich eingecheckt. Bitte denke daran dich wieder auszuchecken, wenn du den Spielplatz verlässt.",
          {
            duration: 4000,
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

  function geoapiCoordinates(pos) {
    if (pos) {
      const { latitude, longitude } = pos.coords;
      map.setView([latitude, longitude], 17);
      setLat(latitude);
      setLon(longitude);
    } else {
      console.log("nothing to position from the currentlocation api GPS");
    }
  }

  function geoapiGetLocation() {
    navigator.geolocation.getCurrentPosition(geoapiCoordinates);
  }

  // function trimmer(blabla) {
  //   blabla.replace(/\s/g, "");
  // }

  let whatsappApiUrl =
    "https://api.whatsapp.com/send?text=https://spielplatzchecken.de/api/playgroundshare/";

  let googleRouteUrl = "https://www.google.de/maps/dir//";

  return (
    <>
      {helmet(
        "Spielplatz-Karte",
        "In dieser Karte kannst du Spielplätze in deiner Nähe suchen, finden, dich einchecken und einsehen, ob sich andere Eltern auf Spielplätzen befinden."
      )}
      <form className="Map__SubmitForm" onSubmit={handleOnSubmit}>
        <SubmitForm handleOnSubmit={handleOnSubmit} individualClass="Map" />
      </form>
      <button
        className={"Map__useLocation__button"}
        onClick={geoapiGetLocation}
      >
        Meinen Standort zur Suche nutzen
      </button>
      <MapContainer
        className="Map__Mapcontainer"
        tap={false}
        whenCreated={setMap}
        loadingControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> Contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {playGroundData.map((positionData) => (
            <Marker
              className="Map__Marker"
              icon={getIcon(positionData.userCount)}
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
                  : positionData?.geometry?.type === "LineString"
                  ? [
                      positionData?.geometry?.coordinates[0][1],
                      positionData?.geometry?.coordinates[0][0],
                    ]
                  : positionData?.geometry?.type === "MultiPolygon"
                  ? [
                      positionData?.geometry?.coordinates[0][0][0][1],
                      positionData?.geometry?.coordinates[0][0][0][0],
                    ]
                  : console.error(
                      `the playgroundID: ${positionData?._id} does not work`
                    )
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
                      {positionData?.userCount}
                    </p>
                  </div>
                  <div className="Map__Popup__route__google">
                    <p>
                      <a
                        href={
                          positionData?.geometry?.type === "Point"
                            ? [
                                `${googleRouteUrl}${positionData?.geometry?.coordinates[1]},${positionData?.geometry?.coordinates[0]}`,
                              ]
                            : positionData?.geometry?.type === "Polygon"
                            ? [
                                `${googleRouteUrl}${positionData?.geometry?.coordinates[0][1][1]},${positionData?.geometry?.coordinates[0][1][0]}`,
                              ]
                            : positionData?.geometry?.type === "LineString"
                            ? [
                                `${googleRouteUrl}${positionData?.geometry?.coordinates[0][1]},${positionData?.geometry?.coordinates[0][0]}`,
                              ]
                            : positionData?.geometry?.type === "MultiPolygon"
                            ? [
                                `${googleRouteUrl}${positionData?.geometry?.coordinates[0][0][0][1]},${positionData?.geometry?.coordinates[0][0][0][0]}`,
                              ]
                            : console.error(
                                `problem in finding the playground coordinates: ${positionData?._id}`
                              )
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Route finden
                      </a>
                    </p>
                  </div>
                  <div className="Map__Popup__share__playground">
                    <p>
                      <a
                        href={
                          positionData?.geometry?.type === "Point"
                            ? [
                                `${whatsappApiUrl}${positionData?.geometry?.coordinates[1]}/${positionData?.geometry?.coordinates[0]}/`,
                              ]
                            : positionData?.geometry?.type === "Polygon"
                            ? [
                                `${whatsappApiUrl}${positionData?.geometry?.coordinates[0][1][1]}/${positionData?.geometry?.coordinates[0][1][0]}/`,
                              ]
                            : positionData?.geometry?.type === "LineString"
                            ? [
                                `${whatsappApiUrl}${positionData?.geometry?.coordinates[0][1]}/${positionData?.geometry?.coordinates[0][0]}/`,
                              ]
                            : positionData?.geometry?.type === "MultiPolygon"
                            ? [
                                `${whatsappApiUrl}${positionData?.geometry?.coordinates[0][0][0][1]}/${positionData?.geometry?.coordinates[0][0][0][0]}/`,
                              ]
                            : console.error(
                                `problem in finding the playground coordinates: ${positionData?._id}`
                              )
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Spielplatz teilen
                      </a>
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
