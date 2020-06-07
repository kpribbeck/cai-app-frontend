import React, { useState, useEffect } from "react";
import { authUserService } from "../../requests/UserRequests";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteStory } from "../../requests/StoryRequests";
import Spinner from "../layout/Spinner";
import "./Stories.css";

const StoryItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
  }, []);

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteStory(props.id);
      setLoading(false);

      props.createNotification(
        "¡Éxito!",
        "Se ha eliminado el contenido correctamente."
      );
      props.history.push("/");
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="item-container">
      <a href={`stories/${props.id}`} className="title">
        <h3>{props.title}</h3>
      </a>
      <hr />
      <p>{props.body}</p>
      {user && (user.user.id == props.userId || user.user.is_admin == 1) && (
        <div id="button-bar">
          <a href={`/stories/edit/${props.id}`}>
            <button onClick={(e) => onDelete(e)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </a>
          <a href={`/stories/edit/${props.id}`}>
            <button>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default withRouter(StoryItem);
