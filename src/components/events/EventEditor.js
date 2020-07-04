import React, { useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import { getEvent, postEvent, putEvent } from "../../requests/EventRequests";
import GoogleMap from "../layout/GoogleMap";
import SearchLocationInput from "../layout/SearchLocationInput";
import Spinner from "../layout/Spinner";

const EventEditor = ({ createNotification, history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [eventId, setEventId] = useState(null);

  const [address, setAddress] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizer: "",
    place: "",
    category: "",
  });

  const { title, description, organizer, place, category } = formData;

  // This executes when component is mounted
  // If we are not in /events/new is because we must be editing a specific event,
  // then we need to get the current data of that event
  useEffect(() => {
    if (currentUrl.pathname !== "/events/new") {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (eventId) => {
    try {
      setLoading(true);
      const res = await getEvent(eventId);
      setLoading(false);
      setEventId(res.data.id);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        organizer: res.data.organizer,
        place: res.data.place,
        category: res.data.category,
      });
      setAddress(res.data.place);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  const handleChangeLocation = (newLocation) => {
    console.log("old: " + JSON.stringify(formData));
    console.log("newLocation: " + String(newLocation));
    // const newState = {
    //   ...formData,
    //   ["place"]: newLocation,
    // };

    // console.log(newState);
    // setAddress(newLocation);
    // console.log(address);

    // setFormData(newState)
  }

  const onChange = (e) => {
    const newState = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(newState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(address);
    const newState = {
      ...formData,
      'place': address,
    }

    try {
      if (currentUrl.pathname === "/events/new") {
        // POST
        setLoading(true);
        const res = await postEvent(newState);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has creado un nuevo evento correctamente."
        );
        history.push("/events");
      } else {
        // PUT
        setLoading(true);
        console.log(formData);
        await putEvent(eventId, newState);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has modificado un evento correctamente."
        );
        history.push("/events");
      }
    } catch (err) {
      setLoading(false);
      setErrors({
        request: {
          message: "Error de servidor. Intente más tarde.",
        },
      });
      console.error(err);
    }
  };

  const displayErrors = Object.keys(errors).map((error) => (
    <p className="error-message" key={error}>
      {errors[error].message}
    </p>
  ));

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="titles">Form para Eventos</h1>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            {Object.keys(errors).length > 0 && displayErrors}
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="title">Título:</label>
            </div>
            <div className="col-80">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="description">Descripción:</label>
            </div>
            <div className="col-80">
              <textarea
                className="textarea-form"
                id="description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="organizer">Organizador:</label>
            </div>
            <div className="col-80">
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={organizer}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="place">Lugar:</label>
            </div>
            <div className="col-80">
              {/* <input
                type="text"
                id="place"
                name="place"
                value={place}
                onChange={(e) => onChange(e)}
                required
              /> */}
              <SearchLocationInput location={address} updateLocation={setAddress} />
              {/* <GoogleMap /> */}
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="category">Fecha:</label>
            </div>
            <div className="col-80">
              <input
                type="date"
                id="category"
                name="category"
                value={category}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Publicar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(EventEditor);
