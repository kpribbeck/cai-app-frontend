import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getLostFounds } from "../../requests/LostFoundRequests";
import LostFoundItem from "./LostFoundItem";

const LostFounds = ({ createNotification }) => {
  const [lostFounds, setLostFounds] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const displayLostFounds = lostFounds.map((lostFound) => (
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
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-dark text-center">Objetos Perdidos</h1>
      <br></br>
      <table>
        <tbody>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Nombre dueño</th>
            <th>Entregado</th>
            <th>Imagen</th>
            <th>Borrar</th>
            <th>Editar</th>
          </tr>
          {displayLostFounds}
        </tbody>
      </table>
    </Fragment>
  );
};

export default LostFounds;
