import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteStory } from "../../requests/StoryRequests";
import Spinner from "../layout/Spinner";


const StoryItem = (props) =>
{
  const [loading, setLoading] = useState(false);

  const onDelete = async (e) => 
  {
    e.preventDefault();
    try
    {
      setLoading(true);
      const res = await deleteStory(props.id);
      setLoading(false);
      props.history.push('/');
    }
    catch(err)
    {
      setLoading(false);
      console.log("Error: " + err);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="story-item border shadow-sm p-3 mb-3 bg-white rounded">
      <div>
        <Link to={`/stories/${props.id}`}>
          <h3 className="my-1 text-dark">{props.title}</h3>
        </Link>
        <Link to={`/stories/edit/${props.id}`}>
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
          onClick={e => onDelete(e)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <p>{props.body}</p>
      </div>

    </div>
  );
}

export default withRouter(StoryItem);