import React, { useEffect } from 'react'
import { useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


export default function Map({locations}) {
	const mapFrameRef=useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapFrameRef.current);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstanceRef.current);

            // Set initial map bounds
            const bounds = [
                [29.7453016622136, 31.129760742187504],
                [33.925129700072, 38.38073730468751],
            ];
            mapInstanceRef.current.fitBounds(bounds);
        }

        // Add markers for locations
        if (locations) {
            locations.forEach((location) => {
                const latitude = parseFloat(location.latitude);
                const longitude = parseFloat(location.longitude);

                if (!isNaN(latitude) && !isNaN(longitude)) {
                    L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
                }
            });
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [locations]);

	return (
		<div id="map">
			<div id='mapFrame' ref={mapFrameRef} ></div>
		</div>
	)
}
