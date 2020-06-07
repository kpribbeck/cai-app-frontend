import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getProyects } from "../../requests/ProyectRequests";
import ProyectItem from "./ProyectItem";

const Proyects = ({ createNotification }) => {
  const [proyects, setProyects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getProyects();
      setLoading(false);
      setProyects(res.data);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayProyects = proyects.map((proyect) => (
    <ProyectItem
      key={proyect.id}
      id={proyect.id}
      name={proyect.name}
      description={proyect.description}
      contact={proyect.contact}
      createNotification={createNotification}
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-dark text-center">Últimos proyectos</h1>

      {proyects.length > 0 ? (
        displayProyects
      ) : (
        <p className="text-center"> ¡Aún no tenemos proyectos!</p>
      )}
    </Fragment>
  );
};

export default Proyects;
