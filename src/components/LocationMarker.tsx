'use client'


import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Position } from '@/types';

const icon = new Icon({
  iconUrl: '/images/user.png',
  iconSize: [20, 35],
  iconAnchor: [10, 35]
});

interface LocationMarkerProps {
  initialPosition: Position;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ initialPosition }) => {
  const [position, setPosition] = useState<Position | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      });
      map.flyTo(e.latlng, map.getZoom());
    }
  });

//   const handleGoToCurrentPosition = () => {
//     if (position) {
//       map.flyTo([position.latitude, position.longitude], map.getZoom());
//     }
//   };

  return position === null ? null : (
    <>
      <Marker position={[position.latitude, position.longitude]} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    </>
  );
};

export default LocationMarker;
