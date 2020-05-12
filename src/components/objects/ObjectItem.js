import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteObject } from '../../requests/ObjectRequests';
import Spinner from '../layout/Spinner';
import './Objects.css';

const ObjectItem = (props) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteObject(props.id);
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
      <td>{props.description}</td>
      <td>{props.stock}</td>
      <td>$ {props.price}</td>
    </tr>
  );
};

export default withRouter(ObjectItem);
