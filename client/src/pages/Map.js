import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CheckInButton from "../components/CheckInButton";
import { latBasedToGeometryType } from "../hooks/positionsBasedToGeometryType";
import { lonBasedToGeometryType } from "../hooks/positionsBasedToGeometryType";
import SubmitForm from "../components/SubmitForm";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./Map.css";
import L from "leaflet";
import iconColored from "../assets/Images/swing_icon_colored.png";
import iconWhite from "../assets/Images/swing_icon_white.png";
import iconChild from "../assets/Images/child_icon.png";
import googleMapsIcon from "../assets/Images/google-maps.png";
import telegramIcon from "../assets/Images/telegram_icon_share.png";
import whatsappIcon from "../assets/Images/whatsapp_icon_share.png";
import "leaflet-loading";
import toast from "react-hot-toast";
import helmet from "../hooks/helmet";
import defaultVisitsPatch from "../hooks/defaultVisitsPatch";
import exclamation from "../assets/Images/exclamation.png";
import createInternLink from "../hooks/createInternLink";
import sharing from "../assets/Images/sharing.png";

export default function Map({
  checkInState,
  checkOutState,
  latState,
  lonState,
}) {
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
  const whatsappApiUrl =
    "https://api.whatsapp.com/send?text=https://spielplatzchecken.de/api/playgroundshare/";
  const googleRouteUrl = "https://www.google.de/maps/dir//";
  const telegramUrl = `https://t.me/share/url?url=https://spielplatzchecken.de/api/playgroundshare/`;
  const [toolTipp, setToolTipp] = useState(`Map__Popup__toolTipp--hide`);
  const [toolTippReporting, setToolTippReporting] = useState(
    `Map__Popup__report__playground__wrapper--hide`
  );
  const mP = "Map__Popup";
  const [select, setSelect] = useState();

  useEffect(() => {
    try {
      if (latState && lonState) {
        setLat(latState);
        setLon(lonState);
        map.setView([latState, lonState], 17);
      }
    } catch (e) {
      console.error(e);
    }
  }, [latState, lonState, map]);

  useEffect(() => {
    const searchInputUrl = `https://nominatim.openstreetmap.org/search?q=Deutschland,${locationSearchValue}&limit=3&format=json`;
    if (locationSearchValue) {
      async function fetchCoordinatesApi() {
        try {
          let response = await fetch(searchInputUrl);
          response = await response.json();
          if (response.length > 0) {
            const newLatitude = Number(response[0]?.lat);
            const newLongitude = Number(response[0]?.lon);
            setLat(newLatitude);
            setLon(newLongitude);
            map.setView([newLatitude, newLongitude], 16);
          } else {
            toast.error(
              "Leider konnten wir mit deiner Suchanfrage nichts finden. Versuche es nochmal."
            );
          }
        } catch (e) {
          console.error("nominatim api error:", e);
        }
      }
      fetchCoordinatesApi();
    } else if (numberLonParams) {
      try {
        map.setView([numberLatParams, numberLonParams], 20);
      } catch (e) {
        console.error(e);
      }
      setLat(numberLatParams);
      setLon(numberLonParams);
    }
  }, [locationSearchValue, map, numberLatParams, numberLonParams]);

  useEffect(() => {
    const url = `/api/playground/${lon}/${lat}`;
    async function fetchAllPlaygroundsApi() {
      try {
        let response = await fetch(url);
        response = await response.json();
        setPlayGroundData(response);
      } catch (e) {
        console.error("fetch all playgrounds error:", e);
      }
    }
    fetchAllPlaygroundsApi();
  }, [lat, lon, numberLatParams, map, updatePage]);

  useEffect(() => {
    const url = `/api/user/${localStorageUserId}`;
    async function fetchAllPlaygroundsApi() {
      try {
        let response = await fetch(url);
        response = await response.json();
        setDbUserId(response?.checkedInUserMongoId);
        checkInState(dbUserId);
      } catch (e) {
        console.error("fetching user data error:", e);
      }
    }
    fetchAllPlaygroundsApi();
  }, [dbUserId, checkOutState, localStorageUserId, updatePage, checkInState]);

  useEffect(() => {
    defaultVisitsPatch("615af599ff20382e9dd25aab");
    defaultVisitsPatch("615af5a7ff20382e9dd25aac");
  }, []);

  function handleOnSubmit(e) {
    window.location.reload();
    try {
      e.preventDefault();
      const form = e.target;
      const formInputValue = form.searchInput.value;
      sessionStorage.setItem("inputText", JSON.stringify(formInputValue));
      form.reset();
      setUpdatePage(!updatePage);
    } catch (e) {
      console.error(
        "ups, there has been an error while submiting your value",
        e
      );
    }
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
        console.error("check-in error:", error);
      });
  }

  function geoapiCoordinates(pos) {
    if (pos) {
      const { latitude, longitude } = pos.coords;
      map.setView([latitude, longitude], 17);
      setLat(latitude);
      setLon(longitude);
    }
  }

  function geoapiGetLocation() {
    navigator.geolocation.getCurrentPosition(geoapiCoordinates);
  }

  function handleToolTippSharing() {
    if (toolTipp === `Map__Popup__toolTipp--hide`) {
      setToolTipp(`Map__Popup__toolTipp--show`);
    } else {
      setToolTipp(`Map__Popup__toolTipp--hide`);
    }
  }
  function handleToolTippReport() {
    if (toolTippReporting === `Map__Popup__report__playground__wrapper--hide`) {
      setToolTippReporting(`Map__Popup__report__playground__wrapper`);
    } else {
      setToolTippReporting(`Map__Popup__report__playground__wrapper--hide`);
    }
  }

  function handleOnReportPlayground(clickedPlayground) {
    if (select) {
      const postMethod = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName: clickedPlayground._id,
          message: select,
          subject: "Spielplatz Meldung",
        }),
      };
      toast.success("Vielen Dank für das Melden des Spielplatzes");

      fetch("/api/contactform", postMethod)
        .then((res) => {
          res.json();
        })
        .catch((error) => {
          console.error(
            error + "there has been a problem while sending us a message"
          );
        });
    } else {
      toast.error(
        "bitte wähle einen Grund aus, warum dieser Spielplatz gemeldet wird"
      );
    }
  }

  function handleOnChange(e) {
    setSelect(e.target.value);
  }

  return (
    <>
      {helmet(
        "Spielplatz-Karte",
        "In dieser Karte kannst du Spielplätze in deiner Nähe suchen, finden, dich einchecken und einsehen, ob sich andere Eltern auf Spielplätzen befinden."
      )}
      <form className="Map__SubmitForm" onSubmit={handleOnSubmit}>
        <SubmitForm individualClass="Map" />
      </form>
      <button
        className={"Map__useLocation__button"}
        onClick={geoapiGetLocation}
      >
        Meinen Standort zur Suche nutzen
      </button>
      <div className="Map__report__playground">
        <p>
          Du kannst einen Spielplatz nicht finden? Dann melde ihn bitte{" "}
          {createInternLink("/kontakt", "hier")}.
        </p>
      </div>
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
              position={[
                latBasedToGeometryType(positionData),
                lonBasedToGeometryType(positionData),
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
                  {positionData?.properties?.name ? (
                    <p className="Popup__positionDataName">
                      {positionData?.properties?.name}
                    </p>
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
                  <div className="Map__Popup__linebreaker"></div>
                  <div className={toolTipp}>
                    <p>
                      Route zum Spielplatz über Google-Maps finden und
                      Spielplatz auf Whatsapp oder Telegram teilen
                    </p>
                  </div>
                  <img
                    onClick={handleToolTippSharing}
                    className="SubmitForm__info-button"
                    src={sharing}
                    alt="sharing-button"
                  />
                  <div className="Map__Popup__sharer__wrapper">
                    <div className="Map__Popup__route__google">
                      <a
                        href={[
                          `${googleRouteUrl}${latBasedToGeometryType(
                            positionData
                          )},${lonBasedToGeometryType(positionData)}`,
                        ]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <img
                          src={googleMapsIcon}
                          alt="Google-Maps-Route zum Spielplatz"
                        />
                      </a>
                    </div>
                    <div className="Map__Popup__share__positionData__whatsapp">
                      <a
                        href={[
                          `${whatsappApiUrl}${latBasedToGeometryType(
                            positionData
                          )}/${lonBasedToGeometryType(
                            positionData
                          )}/ Hättest du Lust auf diesen Spielplatz zu gehen?`,
                        ]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <img
                          src={whatsappIcon}
                          alt="Spielplatz auf Whatsapp teilen"
                        />
                      </a>
                    </div>
                    <div className="Map__Popup__share__positionData__telegram">
                      <a
                        href={[
                          `${telegramUrl}${latBasedToGeometryType(
                            positionData
                          )}/${lonBasedToGeometryType(
                            positionData
                          )}/&text=Hättest du Lust auf diesen Spielplatz zu gehen?`,
                        ]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={telegramIcon}
                          alt="Spielplatz auf Telegram teilen"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="Map__Popup__linebreaker"></div>
                  <div className={toolTippReporting}>
                    <select onChange={handleOnChange}>
                      <option value="">Bitte Grund wählen</option>
                      <option value="Spielplatz gibt es nicht">
                        Spielplatz gibt es nicht
                      </option>
                      <option value="Spielplatz ist privat">
                        Spielplatz ist privat
                      </option>
                      <option value="Sonstiges">Sonstiges</option>
                    </select>

                    <button
                      onClick={() => handleOnReportPlayground(positionData)}
                      className={`${mP}__submit`}
                      type="submit"
                    >
                      Spielplatz melden
                    </button>
                  </div>
                  <div className="Map__Popup__report__info__wrapper">
                    <img
                      onClick={handleToolTippReport}
                      className="SubmitForm__info-button"
                      src={exclamation}
                      alt="report-button"
                    />
                    <p>Spielplatz melden</p>
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
