import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { deleteObject } from "../../requests/ObjectRequests";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authUserService } from "../../requests/UserRequests";
import Spinner from "../layout/Spinner";
import "./Objects.css";

const ObjectItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
  }, []);

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteObject(props.id);
      setLoading(false);

      props.createNotification(
        "¡Éxito!",
        "Se ha eliminado el contenido correctamente."
      );
      props.getData();
      props.history.push("/objects");
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {user ? (
        <tr>
          <td>{props.name}</td>
          <td>{props.description}</td>
          <td>{props.stock}</td>
          <td>$ {props.price}</td>
          <td>
            {console.log("Picture: " + props.picture)}
            {props.picture !== "" ? (
              <img src={props.picture} />
            ) : (
              <img src="https://www.pngkey.com/png/detail/287-2874452_pen-vector-graphics.png" />
            )}
          </td>
          <td>
            <a href={`/objects/edit/${props.id}`}>
              <button onClick={(e) => onDelete(e)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </a>
          </td>
          <td>
            <a href={`/objects/edit/${props.id}`}>
              <button>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </a>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{props.name}</td>
          <td>{props.description}</td>
          <td>{props.stock}</td>
          <td>$ {props.price}</td>
          <td>
            {console.log("Picture: " + props.picture)}
            {props.picture !== "" ? (
              <img src={props.picture} />
            ) : (
              <img src="https://www.pngkey.com/png/detail/287-2874452_pen-vector-graphics.png" />
            )}
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default withRouter(ObjectItem);
