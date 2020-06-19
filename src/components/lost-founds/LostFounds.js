import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getLostFounds } from "../../requests/LostFoundRequests";
import LostFoundItem from "./LostFoundItem";
import FilterBox from "../layout/FilterBox";
import { authUserService } from "../../requests/UserRequests";

const LostFounds = ({ createNotification }) => {
  const [lostFounds, setLostFounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getLostFounds();
      setLoading(false);
      setLostFounds(res.data);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayLostFounds = lostFounds.map(
    (lostFound) =>
      (lostFound.name.toLowerCase().includes(filter.toLowerCase()) ||
        lostFound.description.toLowerCase().includes(filter.toLowerCase())) && (
        <LostFoundItem
          key={lostFound.id}
          id={lostFound.id}
          name={lostFound.name}
          picture={lostFound.picture}
          description={lostFound.description}
          pickedBy_name={lostFound.pickedBy_name}
          pickedBy_mail={lostFound.pickedBy_mail}
          pickedBy_phone={lostFound.pickedBy_phone}
          createNotification={createNotification}
          getData={getData}
        />
      )
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <FilterBox value={filter} onChange={setFilter} />
      <h1 className="titles">Objetos Perdidos</h1>
      <table>
        <thead>
          {user ? (
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Nombre dueño</th>
              <th>Entregado</th>
              <th>Imagen</th>
              <th>Borrar</th>
              <th>Editar</th>
            </tr>
          ) : (
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Nombre dueño</th>
              <th>Entregado</th>
              <th>Imagen</th>
            </tr>
          )}
        </thead>
        <tbody>{displayLostFounds}</tbody>
      </table>
    </Fragment>
  );
};

export default LostFounds;
