import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteLostFound } from "../../requests/LostFoundRequests";
import Spinner from "../layout/Spinner";
import { authUserService } from "../../requests/UserRequests";
//import './LostFounds.css';

const LostFoundItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
  }, []);

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteLostFound(props.id);
      setLoading(false);

      props.createNotification(
        "¡Éxito!",
        "Se ha eliminado el contenido correctamente."
      );
      props.getData();
      props.history.push("/lost-founds");
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
          <td>{props.pickedBy_name}</td>
          <td>{props.pickedUp == 1 ? "Si" : "No"}</td>
          <td>
            <img src={props.picture} />
          </td>
          <td>
            <button onClick={() => onDelete()}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
          <td>
            <a href={`/lost-founds/edit/${props.id}`}>
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
          <td>{props.pickedBy_name}</td>
          <td>{props.pickedUp == 1 ? "Si" : "No"}</td>
          <td>
            <img src={props.picture} />
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default withRouter(LostFoundItem);
