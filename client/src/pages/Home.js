import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
// import L from "react-leaflet";

export default function Home() {
  const [zip, setZip] = useState();
  const [latitude, setLatitude] = useState(48.07863328440315);
  const [longitude, setLongitude] = useState(11.522722315119717);

  useEffect(() => {
    let url = `https://nominatim.openstreetmap.org/search?q=${zip}&limit=20&format=json`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLatitude(data[0].lat);
        setLongitude(data[0].lon);
      });
  }, [latitude, longitude, zip]);

  function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputValue = form.plz.value;
    setZip(inputValue);
    form.reset();
    // let map = L.map("map").fitWorld();
    // map.flyTo([13.87992, 45.9791], 12);
  }

  //this function works when user clicks on "the map.. it goes to the location of the userx"
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input name="plz" id="plz" placeholder="deine PLZ" />
        <button type="submit">Send</button>
      </form>

      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <button>CHECK-IN</button>
          </Popup>
        </Marker>
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
