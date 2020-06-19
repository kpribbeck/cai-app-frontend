import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getUsersByState } from "../../requests/UserRequests";
import UserItem from "./UserItem";

const Users = ({ createNotification }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getUsersByState("1"); // accepted users only
      setLoading(false);
      setUsers(res.data);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayUsers = users.map(
    (user) =>
      user.is_admin !== 1 && (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          last_name={user.last_name}
          mail={user.mail}
          student_number={user.student_number}
          contact_number={user.contact_number}
          createNotification={createNotification}
        />
      )
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="titles">Usuarios</h1>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Mail</th>
            <th>Numero de Alumno</th>
            <th>Teléfono</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{displayUsers}</tbody>
      </table>
    </Fragment>
  );
};

export default Users;
