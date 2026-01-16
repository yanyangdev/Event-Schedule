import "leaflet/dist/leaflet.css"; // import leaflet css

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { type LatLngExpression, Icon } from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

type EventMapProps = {
  location: string;
  latitude: number;
  longitude: number;
};

const EventMap = ({ location, latitude, longitude }: EventMapProps) => {
  const position: LatLngExpression = [latitude, longitude];
  const markerIcon = new Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full aspect-square bg-white"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={markerIcon}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default EventMap;
