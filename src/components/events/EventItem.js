import React, { useState, useEffect } from "react";
import { authUserService } from "../../requests/UserRequests";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteEvent } from "../../requests/EventRequests";
import Spinner from "../layout/Spinner";
import "./Events.css";

const EventItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
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
      props.history.push("/events");
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="item-container">
      <a href={`events/${props.id}`} className="title">
        <h3>{props.title}</h3>
      </a>
      <hr />
      <p>{props.description}</p>
      <p>Lugar: {props.place}</p>
      <p>Categoria: {props.category}</p>
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
