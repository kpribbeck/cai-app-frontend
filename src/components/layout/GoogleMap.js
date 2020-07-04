import React, { useRef, useState, useEffect } from 'react';

const GoogleMap = ({ address }) => {
  const googelMapRef = useRef(null);
  const [googleMap, setMap] = useState(undefined);

  const createGoogleMap = () => {
    return new window.google.maps.Map(googelMapRef.current, {
      zoom: 16,
      center: {
        lat: 43.642567,
        lng: -79.387054,
      },
      disableDefaultUI: true,
    })
  }

  const createMarker = () => {
    new window.google.maps.Marker({
      position: { lat: 43.642567, lng: -79.387054},
      map: googleMap,
    })
  }

  function codeAddress(map) {
    console.log("address: " + address);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new window.google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  const onLoad = () => {
    const newMap = createGoogleMap();

    codeAddress(newMap);
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.type = `text/javascript`;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.defer = true;
    script.async = true;
    
    // Append the 'script' element to 'body'
    window.document.body.appendChild(script);

    script.addEventListener('load', onLoad)
  }, [setMap]);

  const initMap = () => {
    // JS API is loaded and available
    console.log("created new map!");
  }

  return (
  <div id='google-map' ref={googelMapRef} />
  )
}

export default GoogleMap;