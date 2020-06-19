import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getObjects } from "../../requests/ObjectRequests";
import ObjectItem from "./ObjectItem";
import FilterBox from "../layout/FilterBox";
import { authUserService } from "../../requests/UserRequests";

const Objects = ({ createNotification }) => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    authUserService.currentUser.subscribe((x) => setUser(x));
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getObjects();
      const filtered = res.data.filter((object) => object.price > 0);
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

  const displayObjects = objects.map(
    (object) =>
      (object.name.toLowerCase().includes(filter.toLowerCase()) ||
        object.description.toLowerCase().includes(filter.toLowerCase())) && (
        <ObjectItem
          key={object.id}
          id={object.id}
          name={object.name}
          description={object.description}
          stock={object.stock}
          price={object.price}
          picture={object.picture}
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
      <h1 className="titles">Venta</h1>
      <table>
        <thead>
          {user ? (
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Borrar</th>
              <th>Editar</th>
            </tr>
          ) : (
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Imagen</th>
            </tr>
          )}
        </thead>
        <tbody>{displayObjects}</tbody>
      </table>
    </Fragment>
  );
};

export default Objects;
