import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteLostFound } from "../../requests/LostFoundRequests";
import Spinner from "../layout/Spinner";
//import './LostFounds.css';

const LostFoundItem = (props) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (e) => {
    e.peventDefault();
    try {
      setLoading(true);
      await deleteLostFound(props.id);
      setLoading(false);

      props.createNotification(
        "¡Éxito!",
        "Se ha eliminado el contenido correctamente."
      );
      props.history.push("/lost-founds");
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.pickedBy_name}</td>
      <td>{props.pickedUp == 1 ? "Si" : "No"}</td>
      <td><img src={props.picture} /></td>
      {/* <td><img src="http://placekitten.com/g/400/400" /></td> */}
    </tr>
  );
};

export default withRouter(LostFoundItem);
