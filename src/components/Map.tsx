'use client'

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon } from 'leaflet';

const defaultPosition: [number, number] = [51.505, -0.09];

export interface ListLocation {
  id: string;
  localName: string;
  lat: number;
  lng: number;
  image: string;
  description: string;
  address: string;
  owner: string;
  pool: number;
  catetory: string;
}

const icon: Icon = new Icon({
  iconUrl: '/images/marker-icon.png',
  iconSize: [20, 35],
  iconAnchor: [10, 35],
});

const Map = () => {
  const listLocation: ListLocation[] = [];
  return (
    <div className=" flex flex-col w-full h-full">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        className=" w-full h-full relative lg:rounded-[1rem]"
        scrollWheelZoom={true}
        dragging={true}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
`}/>
        
        <Marker position={defaultPosition} icon={icon}>
          <Popup >
            
          </Popup>
        </Marker>
      </MapContainer>

    </div>
  );
};

export default Map;
