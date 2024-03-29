'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LocationInfoMarker } from '@/types';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

const icon = new Icon({
    iconUrl: '/images/user.png',
    iconSize: [20, 35],
    iconAnchor: [10, 35]
});

const ListMarker = () => {
    const [listLocation, setListLocation] = useState<any[]>([]);

    useEffect(() => {
        const getListLocation = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getlocation');
                setListLocation(response.data.locations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        getListLocation();
    }, []); 
      

    return (
        <>
            {listLocation.length > 0 && listLocation.map((location, index) => (
                <Marker key={location._id} position={[location.latitude, location.longitude]} icon={icon}>
                    <Popup>
                        <div>
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
