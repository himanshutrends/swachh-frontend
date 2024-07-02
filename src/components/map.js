'use client'
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useUser } from '@/context/User';

const MapComponent = () => {
  const [directionsResponse, setDirectionsResponse] = useState([]);
  const [bins, setBins] = useState([]);
  const [error, setError] = useState(null);
  const { user, loading } = useUser();

  useEffect(() => {
    fetchBins();
  }, [loading]);

  const fetchBins = async () => {
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
        setBins(data);
      } catch (error) {
        setError(error);
      }
    }
  };

  const splitWaypoints = (waypoints, maxWaypoints = 25) => {
    const chunks = [];
    for (let i = 0; i < waypoints.length; i += maxWaypoints) {
      chunks.push(waypoints.slice(i, i + maxWaypoints));
    }
    return chunks;
  };

  const fetchRoute = async () => {
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
        if (data.routes && Array.isArray(data.routes)) {
          const waypoints = data.routes[0].legs.flatMap(leg =>
            leg.steps.map(step => ({
              location: new google.maps.LatLng(step.start_location.lat, step.start_location.lng),
              stopover: false,
            }))
          );
          const waypointChunks = splitWaypoints(waypoints);
          fetchSegmentedDirections(waypointChunks);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        setError(error);
      }
    }
  };

  const fetchSegmentedDirections = async (waypointChunks) => {
    const DirectionsService = new google.maps.DirectionsService();
    const results = [];

    for (let i = 0; i < waypointChunks.length; i++) {
      const chunk = waypointChunks[i];
      const origin = chunk[0].location;
      const destination = chunk[chunk.length - 1].location;
      const waypoints = chunk.slice(1, chunk.length - 1);

      DirectionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            results.push(result);
            if (results.length === waypointChunks.length) {
              setDirectionsResponse(results);
            }
          } else {
            console.error(`Error fetching directions: ${result}`);
          }
        }
      );
    }
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyB-fBkFNcH9NsY1iIoR4IIMqsLU_u0HQSU">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: 22.9734, lng: 78.6569 }}
          zoom={10}
        >
          {bins && bins.map(bin => (
            <Marker
              key={bin._id}
              position={{ lat: bin.coordinates.lat, lng: bin.coordinates.lng }}
            />
          ))}
          {directionsResponse && directionsResponse.map((dir, index) => (
            <DirectionsRenderer key={index} directions={dir} />
          ))}
        </GoogleMap>
      </LoadScript>
      <button
        className="bg-blue-500 hover:bg-blue-700 w-fit text-white font-bold py-2 px-4 rounded-full"
        onClick={fetchRoute}
      >
        Find Optimal Route
      </button>
    </>
  );
};

export default MapComponent;
