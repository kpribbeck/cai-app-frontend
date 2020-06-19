import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getProyects } from "../../requests/ProyectRequests";
import ProyectItem from "./ProyectItem";
import FilterBox from "../layout/FilterBox";

const Proyects = ({ createNotification }) => {
  const [proyects, setProyects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

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

  const displayProyects = proyects.map(
    (proyect) =>
      (proyect.name.toLowerCase().includes(filter.toLowerCase()) ||
        proyect.description.toLowerCase().includes(filter.toLowerCase())) && (
        <ProyectItem
          key={proyect.id}
          id={proyect.id}
          name={proyect.name}
          description={proyect.description}
          contact={proyect.contact}
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
      <h1 className="titles">Proyectos</h1>

      {proyects.length > 0 ? (
        displayProyects
      ) : (
        <p className="textos"> ¡Aún no tenemos proyectos!</p>
      )}
    </Fragment>
  );
};

export default Proyects;
