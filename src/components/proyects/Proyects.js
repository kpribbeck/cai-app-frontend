import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getProyects } from '../../requests/ProyectRequests';
import ProyectItem from './ProyectItem';

const Proyects = () => {
  const testProyects = [
    {
      id: 0,
      name: 'First name',
      description: 'First proyect description',
      contact: 'First contact',
      picture: 'First pic url',
    },
    {
      id: 0,
      name: 'Second name',
      description: 'Second proyect description',
      contact: 'Second contact',
      picture: 'Second pic url',
    },
  ];

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
      console.log('Error: ' + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayTestProyects = testProyects.map((proyect) => (
    <ProyectItem
      key={proyect.id}
      id={proyect.id}
      name={proyect.name}
      description={proyect.description}
      contact={proyect.contact}
    />
  ));

  const displayProyects = proyects.map((proyect) => (
    <ProyectItem
      key={proyect.id}
      id={proyect.id}
      name={proyect.name}
      description={proyect.description}
      contact={proyect.contact}
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-dark text-center'>Últimos proyectos</h1>

      {proyects.length > 0 ? (
        displayProyects
      ) : (
        <p className='text-center'> ¡Aún no tenemos proyectos!</p>
      )}
    </Fragment>
  );
};

export default Proyects;
