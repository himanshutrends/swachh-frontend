'use client'
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useUser } from '@/context/User';

const MapComponent = () => {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [bins, setBins] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        fetchBins();
    }, []);

    const fetchBins = async () => {
        console.log('fetching bins');
        console.log(user);
        if (user.access_token) {
            try {
                const response = await fetch('http://localhost:5000/waste/bins/filled', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.access_token,
                    },
                });
                const data = await response.json();
                console.log(data);
                setBins(data);
            } catch (error) {
                setError(error);
            }
        }
    };

    const fetchRoute = async () => {
        console.log('fetching route');
        if (user.access_token) {
            try {
                const response = await fetch('http://localhost:5000/waste/bins/route?start_lat=22.9734&start_lng=78.6569', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.access_token,
                    },
                });
                const data = await response.json();
                console.log(data);
                if (data.routes && Array.isArray(data.routes)) {
                    setDirectionsResponse(data);
                } else {
                    setError('Invalid response format');
                }
            } catch (error) {
                setError(error);
            }
        }
    };

    return (
        <>
        <LoadScript googleMapsApiKey="AIzaSyB-fBkFNcH9NsY1iIoR4IIMqsLU_u0HQSU">
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                center={{ lat: 22.9734, lng: 78.6569 }}
                zoom={10}
            >
                {bins.map(bin => (
                    <Marker
                        key={bin._id}
                        position={{ lat: bin.coordinates.lat, lng: bin.coordinates.lng }}
                    />
                ))}
                {directionsResponse && (
                    <DirectionsRenderer
                        directions={directionsResponse}
                    />
                )}
            </GoogleMap>
        </LoadScript>
        <button onClick={fetchRoute}>Find Optimal Route</button>
        </>
    );
};

export default MapComponent;
