import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteLost_n_found } from '../../requests/Lost_n_foundRequests';
import Spinner from '../layout/Spinner';
//import './Lost_n_founds.css';

const Lost_n_foundItem = (props) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (e) => {
    e.peventDefault();
    try {
      setLoading(true);
      await deleteLost_n_found(props.id);
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
      <td>{props.pickedBy_name}</td>
      <td>{props.pickedBy_mail}</td>
      <td>{props.pickedBy_phone}</td>
    </tr>
  );
};

export default withRouter(Lost_n_foundItem);
