import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteUser } from '../../requests/UserRequests';
import Spinner from '../layout/Spinner';
import './Users.css';

const UserItem = (props) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteUser(props.id);
      setLoading(false);
      props.history.push('/');
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
        <a href={`/users/edit/${props.id}`}>
          <button onClick={(e) => onDelete(e)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </a>
      </td>
    </tr>
  );
};

export default withRouter(UserItem);
