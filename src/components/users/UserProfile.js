import React, { Fragment, useState, useEffect } from "react";
import { getUsersByState } from "../../requests/UserRequests";
import Spinner from "../layout/Spinner";

const UserProfile = ({ user }) => {
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getUsersByState("1");
      user.student_number = res.data.filter(
        (user1) => user.id === user1.id
      )[0].student_number;
      user.contact_number = res.data.filter(
        (user1) => user.id === user1.id
      )[0].contact_number;
      user.job = res.data.filter((user1) => user.id === user1.id)[0].job;
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="card">
          {(user.picture !== "") && <img id="profile-picture" src={user.picture} />}
          {/* {user.picture !== "" ? (
            <img id="profile-picture" src={user.picture} />
          ) : (
            <img id="profile-picture" src="https://www.pngkey.com/png/detail/287-2874452_pen-vector-graphics.png" />
          )} */}
        <h1>
          {user.name} {user.last_name}
        </h1>
        <p className="title">Mail</p>
        <p>{user.mail}</p>
        <p className="title">Cargo</p>
        <p>{user.job ? user.job : "No registrado"}</p>
        <p className="title">Número de Alumno</p>
        <p>{user.student_number}</p>
        <p className="title">Contacto</p>
        <p>{user.contact_number}</p>
        <br />
        <a href={`/users/edit/${user.id}`}>
          <button className="changepass">Editar Perfil</button>
        </a>
        <br />
      </div>
    </Fragment>
  );
};

export default UserProfile;
