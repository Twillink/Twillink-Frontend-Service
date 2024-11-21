'use client';

import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import styles from './Map.module.css';
import {useEffect} from 'react';
import {cn} from '@/utils/formater';

interface Position {
  lat: number;
  lng: number;
}

interface MapProps {
  position: [number, number];
  zoom: number;
  popup?: string;
  scrollWheelZoom?: boolean;
  zoomControl?: boolean;
  className?: string;
}

const MARKER_ICON = {
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
} as Leaflet.IconOptions;

const icon = new Leaflet.Icon(MARKER_ICON);

const RecenterAutomatically = ({lat, lng}: Position) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);

  return null;
};

const MyMap = ({
  position,
  zoom = 13,
  popup,
  scrollWheelZoom = false,
  zoomControl = false,
  className,
}: MapProps) => {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      zoomControl={zoomControl}
      attributionControl={false}
      className={cn(styles.container, className, 'z-[0]')}>
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} icon={icon}>
        {popup && (
          <Popup>
            <p>{popup}</p>
          </Popup>
        )}
      </Marker>

      <RecenterAutomatically lat={position[0]} lng={position[1]} />
    </MapContainer>
  );
};

export default MyMap;
