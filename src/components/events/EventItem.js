import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const EventItem = (props) =>
{
  return (
    <div className="event-item border shadow-sm p-3 mb-3 bg-white rounded">
      <div>
        <Link to={`/events/${props.id}`}>
          <h3 className="my-1 text-dark">{props.title}</h3>
        </Link>
        <Link to={`/events/new`}>
          <button
            type="button"
            className="btn btn-light"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-light"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <p>{props.description}</p>
      </div>

    </div>
  );
}

export default (EventItem);