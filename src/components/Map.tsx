'use client'
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import {Marker as Reactmarker} from 'react-map-gl';  
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGeolocation } from '@/hooks/useGeoLocation';
import locations from '@/models/locations.json'; 
import { Button } from './ui/button';
import Detail from './Detail';
interface Location {
  localName: string;
  lat: number;
  lng: number;
  image: string;
  description: string;
  address: string;
  category: string;
  collectionName: string;

}

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ latitude: 10.762622, longitude: 106.682571 });
  const position = useGeolocation();
  const markers: Marker[] = [];
  const markerRef = useRef<Marker | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [viewport.longitude, viewport.latitude],
        zoom: 10,
      });
      const marker = new mapboxgl.Marker({ color: '#1e1e1e' })
      .setLngLat([viewport.longitude, viewport.latitude])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>You are here!</h3>')) // Add popup with message
      .addTo(map);


      locations.forEach((location: Location) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([location.lng, location.lat])
          .addTo(map)
          .getElement();

        marker.addEventListener('click', () => {
          setSelectedLocation(location);
          setIsDrawerVisible(true);
        });
      });

      return () => {
        map.remove();
        markers.forEach(marker => marker.remove());
      };
    }
  }, [mapContainerRef.current, viewport.latitude, viewport.longitude]);

  useEffect(() => {
    if (position?.latitude && position?.longitude) {
      setViewport({
        latitude: position.latitude,
        longitude: position.longitude,
      });
      if (markerRef.current) {
        markerRef.current.setLngLat([position.longitude, position.latitude]);
      }
    } else {
      console.error('Error getting geolocation');
    }
  }, [position]);

  return <>
  <div className=' w-full h-full'>
    <div   className="w-full h-full rounded-sm" ref={mapContainerRef} />

    {selectedLocation && (
            <Detail
              selectedLocation={selectedLocation}
              isDrawerVisible={isDrawerVisible}
              setIsDrawerVisible={setIsDrawerVisible}
            />
          )}
  </div>
  </>
};

export default Map;
