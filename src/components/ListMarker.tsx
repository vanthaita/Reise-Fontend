'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LocationInfoMarker } from '@/types';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { LocationInfo } from '@/types';


const icon = new Icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [20, 35],
    iconAnchor: [10, 35]
});

const ListMarker = () => {
    const [listLocation, setListLocation] = useState<any[]>([]);

    useEffect(() => {
        const getListLocation = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getlocation');
                console.log(response.data);
                setListLocation(response.data);

            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        getListLocation();
    }, []); 


    console.log(listLocation)

    return (
        <>
            {listLocation.length > 0 &&   listLocation.map((location, index) => (
                <Marker key={location} position={[location.lat, location.lng]} icon={icon}>
                    <Popup closeOnClick >
                        <div className=' w-1/2 h-1/2'>
                            <h3>{location.localName}</h3>
                            <p>{location.address}</p>
                            <p>{location.description}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default ListMarker;
