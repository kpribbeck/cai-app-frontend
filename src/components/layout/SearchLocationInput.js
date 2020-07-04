import React, { useState, useEffect, useRef } from 'react'

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script"); // create script tag
  script.type = "text/javascript";

  // when script state is ready and loaded or complete we will call callback
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url; // load by url
  document.getElementsByTagName("head")[0].appendChild(script); // append to head
};


// handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
function handleScriptLoad(updateQuery, autoCompleteRef) {
  // assign autoComplete with Google maps place one time
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["address"], componentRestrictions: { country: "cl" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
  // add a listener to handle when the place is selected
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace(); // get place from google api
  const query = addressObject.formatted_address;
  updateQuery(query);
  // console.log(addressObject);
}

const SearchLocationInput = ({ location, updateLocation }) => {
  // const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
      () => handleScriptLoad(updateLocation, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={event => updateLocation(event.target.value)}
        placeholder="Ingrese una dirección"
        id="place"
        name="place"
        value={location}
        required
      />
    </div>
  );
}

export default SearchLocationInput;