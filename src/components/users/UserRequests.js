import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getUsersByState } from '../../requests/UserRequests';
import UserRequestItem from "./UserRequestItem";


const UserRequests = ({ state, createNotification }) => {
  const testUsers = [
    {
      id: 0,
      mail: 'first@mail.com',
      name: 'Name1',
      last_name: 'LastName1',
      student_number: '12345678',
      contact_number: '+5623456789',
    },
    {
      id: 1,
      mail: 'second@mail.com',
      name: 'Name2',
      last_name: 'LastName2',
      student_number: '12345678',
      contact_number: '+5623456789',
    },
  ];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getUsersByState(state);
      setLoading(false);
      setUsers(res.data);
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayTestUsers = testUsers.map((user) => (
    <UserRequestItem
      key={user.id}
      id={user.id}
      name={user.name}
      last_name={user.last_name}
      mail={user.mail}
      student_number={user.student_number}
      contact_number={user.contact_number}
      is_active={user.is_active}
      createNotification={createNotification}
    />
  ));

  const displayUsers = users.map((user) => (
    <UserRequestItem
      key={user.id}
      id={user.id}
      name={user.name}
      last_name={user.last_name}
      mail={user.mail}
      student_number={user.student_number}
      contact_number={user.contact_number}
      is_active={user.is_active}
      createNotification={createNotification}
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-dark text-center'>Solicitudes de Usuario</h1>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Mail</th>
            <th>Numero de Alumno</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers}
        </tbody>
      </table>
    </Fragment>
  );
}

export default UserRequests;