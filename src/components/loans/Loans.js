import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getObjects } from "../../requests/ObjectRequests";
import LoanItem from "./LoanItem";

const Loans = ({ createNotification }) => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getObjects();
      const filtered = res.data.filter((object) => object.price <= 0);
      setLoading(false);
      setObjects(filtered);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayObjects = objects.map((object) => (
    <LoanItem
      key={object.id}
      id={object.id}
      name={object.name}
      description={object.description}
      stock={object.stock}
      price={object.price}
      createNotification={createNotification}
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-dark text-center">Préstamos</h1>
      <br></br>
      <table>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Stock</th>
          <th>Disponibilidad</th>
          <th>Borrar</th>
          <th>Editar</th>
        </tr>
        {displayObjects}
      </table>
    </Fragment>
  );
};

export default Loans;
