import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { deleteObject } from "../../requests/ObjectRequests";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../layout/Spinner";

const LoanItem = (props) => {
  const [loading, setLoading] = useState(false);

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
      props.history.push("/objects");
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
      <td>{props.stock}</td>
      <td>{props.price === 0 ? "Disponible" : "Prestado"}</td>
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
  );
};

export default withRouter(LoanItem);
