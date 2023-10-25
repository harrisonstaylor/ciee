import {useEffect, useState} from "react";

function LocationDisplay() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            console.error('Geolocation is not available in this browser.');
        }
    }, []);

    return (
        <div>
            <h1>User Coordinates</h1>
            {latitude !== null && longitude !== null ? (
                <div>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </div>
            ) : (
                <p>NO COORDS</p>
            )}
        </div>
    );
}

export default LocationDisplay;
