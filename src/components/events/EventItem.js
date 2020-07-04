import React, { useState, useEffect } from "react";
import { authUserService } from "../../requests/UserRequests";
import { withRouter, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteEvent } from "../../requests/EventRequests";
import Spinner from "../layout/Spinner";
import "../layout/main.css";
import GoogleMap from "../layout/GoogleMap";

const EventItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const currentUrl = useLocation();
  const [itemClass, setClass] = useState("item-container");

  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
    if (currentUrl.pathname !== "/events")
    {
      setClass("view-container");
    }
  }, []);

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteEvent(props.id);
      setLoading(false);

      props.createNotification(
        "¡Éxito!",
        "Se ha eliminado el contenido correctamente."
      );
      props.getData();
      props.history.push("/events");
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className={itemClass}>
      {currentUrl.pathname !== "/events" ? (
        <h3 id="item-title">{props.title}</h3>
      ) : (
        <a href={`events/${props.id}`} className="title">
          <h3>{props.title}</h3>
        </a>
      )}
      <hr />
      <p id="desc">{props.description}</p>
      <p>Te esperamos en {props.place}</p>
      <p>El día {props.category}</p>
      {props.map && props.place && <GoogleMap id="google-map" address={props.place} />}
      {user && (user.user.id == props.userId || user.user.is_admin == 1) && (
        <div id="button-bar">
          <a href={`/events/edit/${props.id}`}>
            <button onClick={(e) => onDelete(e)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </a>
          <a href={`/events/edit/${props.id}`}>
            <button>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default withRouter(EventItem);
