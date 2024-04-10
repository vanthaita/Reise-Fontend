'use client'
import React, { useRef, useEffect, useState, use } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGeolocation } from '@/hooks/useGeoLocation';
import locations from '@/models/locations.json'; 
import { Button } from './ui/button';
import Detail from './Detail';
import { Location } from '@/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ latitude: 10.762622, longitude: 106.682571 });
  const position = useGeolocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markers: Marker[] = [];
  const markerRef = useRef<Marker | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isTransitionSucess, setIsTransitionSucess] = useState(false);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.latitude, viewport.longitude]);

    const handleGeolocationClick = () => {
      if (position?.latitude && position?.longitude) {
        setViewport({
          latitude: position.latitude,
          longitude: position.longitude,
        });
      } else {
        console.error('Error getting geolocation');
      }
    };

    useEffect(() => {
      if (position?.latitude && position?.longitude) {
        setViewport({
          latitude: position.latitude,
          longitude: position.longitude,
        });
      } else {
        console.error('Error getting geolocation');
      }
    }, [position?.latitude, position?.longitude])
    console.log(isTransitionSucess);
  return <>
  <div className='w-full h-full relative'>
    <div className="w-full h-full rounded-sm relative" ref={mapContainerRef} />
    <div className="absolute top-4 right-4 z-[3]">
      <button onClick={handleGeolocationClick}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src='/images/position.png' alt='position' height={30} width={30} />    

      </button>
    </div>
    {selectedLocation && (
      <Detail
        selectedLocation={selectedLocation}
        isDrawerVisible={isDrawerVisible}
        setIsDrawerVisible={setIsDrawerVisible}
        isTransitionSucess={isTransitionSucess}
        setIsTransitionSucess={setIsTransitionSucess}
      />
    )}

    {isTransitionSucess && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-2xl text-white">
            Congratulations!
          </h1>
          <p className="text-white">
            You have successfully collected this location!
          </p>
          <Button onClick={() => setIsTransitionSucess(false)}>Close</Button>
        </div>
      </div>
    )}
  </div>
</>

};

export default Map;
