'use client';

import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import styles from './Map.module.css';
import {useEffect} from 'react';
import {cn} from '@/utils/formater';

// const myCustomColour = '#583470'

const icon = new Leaflet.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RecenterAutomatically = ({lat, lng}: {lat: number; lng: number}) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

const MyMap = (props: any) => {
  const {position, zoom, popup} = props;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      className={cn(styles.container, 'z-[0]')}>
      {/*{!isGoogle ? (*/}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*) : (*/}
      {/*  <TileLayer*/}
      {/*    attribution="Google Maps"*/}
      {/*    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"*/}
      {/*  />*/}
      {/*)}*/}

      <Marker position={position} autoPanOnFocus icon={icon}>
        <Popup>
          <p>{popup}</p>
        </Popup>
      </Marker>
      <RecenterAutomatically lat={position[0]} lng={position[1]} />
    </MapContainer>
  );
};

export default MyMap;
