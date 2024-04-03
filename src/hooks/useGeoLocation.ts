import { useState, useEffect } from 'react';
import { Position, PositionError } from '@/types';
export function useGeolocation(): Position | null {
    const [position, setPosition] = useState<Position | null>(null);
    const [error, setError] = useState<PositionError | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError({ code: 0, message: 'Geolocation is not supported' });
            return;
        }

        const successCallback = (pos: GeolocationPosition) => {
            setPosition({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });
        };

        const errorCallback = (err: GeolocationPositionError) => {
            setError({ code: err.code, message: err.message });
        };

        const options: PositionOptions = {
            enableHighAccuracy: true
        };

        const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return position;
}
