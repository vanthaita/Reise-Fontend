'use client'

import React, { useEffect,useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon } from 'leaflet';
import { useGeolocation } from '@/hooks/useGeoLocation';
import { Position } from '@/types';
import LocationMarker from './LocationMarker';
import { Button } from './ui/button';

const defaultPosition:Position=  {
  latitude: 51.505,
  longitude: -0.09
};

const icon: Icon = new Icon({
  iconUrl: '/images/user.png',
  iconSize: [20, 35],
  iconAnchor: [10, 35],
  iconShape: { 
    type: 'circle',
    coords: [10, 10, 10]
  }
});

const Map = () => {
  // const listLocation: ListLocation[] = [];
  const currentPosition = useGeolocation();
  const [position, setPosition] = useState<Position>(defaultPosition);
  useEffect(() => {
    if (currentPosition) {
      setPosition(currentPosition);
    }
  }, [currentPosition]);


  return (
    <div className=" flex flex-col w-full h-full">
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={10}
        className=" w-full h-full relative lg:rounded-[1rem]"
        scrollWheelZoom={true}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
`}/>
        
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri Satellite">
            <TileLayer
              attribution='&copy; <a href="http://www.esri.com/about/maps/">Esri</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      <LocationMarker initialPosition={position}/>
      </MapContainer>
      
    </div>
  );
};

export default Map;
