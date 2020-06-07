import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import './Users.css';
import { acceptUserRequest, rejectUserRequest } from "../../requests/UserRequests";

const UserRequestItem = (props) => {
  const [loading, setLoading] = useState(false);

  const onAccept = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await acceptUserRequest(props.id);
      setLoading(false);

      props.createNotification("¡Éxito!", "Se ha activado el usuario correctamente.");
      props.history.push('/users/requests');
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  const onReject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await rejectUserRequest(props.id);
      setLoading(false);

      props.createNotification("¡Éxito!", "Se ha rechazado el usuario correctamente.");
      props.history.push('/users/requests');
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <tr>
      <td>{props.name}</td>
      <td>{props.last_name}</td>
      <td>{props.mail}</td>
      <td>{props.student_number}</td>
      <td>{props.contact_number}</td>
      <td>
        {(props.is_active === -1 || props.is_active === 0) && 
          <a href={``}>
          <button id="accept-button" onClick={(e) => onAccept(e)}>
            Aceptar
          </button>
          </a>
        }
        {props.is_active === -1 && 
          <a href={``}>
          <button id="reject-button" onClick={(e) => onReject(e)}>
            Rechazar
          </button>
          </a>
        }
      </td>
    </tr>
  );
}

export default withRouter(UserRequestItem);