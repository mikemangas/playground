// import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useMapEvents } from "react-leaflet";
import testjson from "../testjson.json";
// import L from "leaflet";

export default function Home() {
  // const mapRef = useRef();
  // const [zip, setZip] = useState();
  // const [latitude, setLatitude] = useState(48.07863328440315);
  // const [longitude, setLongitude] = useState(11.522722315119717);
  // const [testData, setTestData] = useState([]);
  // const [testDataOne, setTestDataOne] = useState([]);
  // const [spielplatz, setSpielplatz] = useState();

  // useEffect(() => {
  //   fetch(
  //     "https://opendata.rhein-kreis-neuss.de/api/records/1.0/search/?dataset=dormangen-tischtennisplatten&q=&facet=schule&facet=schultyp&facet=stadtteil"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTestData(data?.records);
  //     });
  // }, []);

  // console.log(testData[1]?.fields?.ort);

  // function renderDataTwo() {
  //   return testData
  //     .map((geoData) => {
  //       return geoData?.fields?.geo_point_2d;
  //     })
  //     .map((geoData2) => {
  //       return geoData2[1];
  //     });
  // }
  // console.log(renderDataOne());
  // console.log(renderDataTwo());
  // useEffect(() => {

  /********** QUERY LINK NOMINATIM!********* */
  // let url = `https://nominatim.openstreetmap.org/search?q=${zip}&limit=20&format=json`;
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setLatitude(data[0].lat);
  //     setLongitude(data[0].lon);
  // });

  // let spielplatzUrl =
  //   "https://opendata.dormagen.de/api/records/1.0/search/?dataset=spielplatze&q=&facet=art_des_angebotes&facet=ortsteil";
  // fetch(spielplatzUrl)
  //   .then((res) => res.json())
  //   .then((data) => setSpielplatz(data?.records[1]?.fields.geopunkt[0]));
  // }, [latitude, longitude, zip]);

  // console.log(spielplatz);

  /* ----------------HANDLE ON SUBMIT--------------*/
  // function handleOnSubmit(event) {
  //   // const standort = [latitude, longitude];
  //   event.preventDefault();
  //   const form = event.target;
  //   const inputValue = form.plz.value;
  //   setZip(inputValue);
  //   form.reset();
  // }

  //this function works when user clicks on "the map.. it goes to the location of the userx"
  // function LocationMarker() {
  //   const [position, setPosition] = useState(null);
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, map.getZoom());
  //     },
  //   });

  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   );
  // }
  function handleDies(e) {
    e.preventDefault();
    return <MapContainer zoom={1} />;
  }
  return (
    <div>
      <form onSubmit={handleDies}>
        <input name="plz" id="plz" placeholder="deine PLZ" />
        <button type="submit">Send</button>
      </form>

      <MapContainer
        // ref={mapRef}
        center={[50.9194634670891, 11.62]}
        zoom={8}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Marker position={[testDataOne[1], testDataOne[0]]}> */}
        {testjson.features.map((positionData) => (
          <Marker
            key={positionData?.properties?.id}
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

        {/* <LocationMarker /> */}
      </MapContainer>
    </div>
  );
}
