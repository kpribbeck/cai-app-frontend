import React, { useState, useEffect, Fragment } from 'react';
import { getProyect } from '../../requests/ProyectRequests';
import { useParams } from 'react-router-dom';
import ProyectItem from './ProyectItem';
import Spinner from '../layout/Spinner';

const Proyect = () => {
  const urlParams = useParams();

  const [proyect, setProyect] = useState(null);
  const [loading, setLoading] = useState(true);

  // makes async call to DB
  const getData = async (proyectId) => {
    try {
      setLoading(true);
      const res = await getProyect(proyectId);
      setLoading(false);
      setProyect(res.data);
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  useEffect(() => {
    getData(urlParams.id);
  }, [urlParams]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='mt-3'>
        <ProyectItem {...proyect} />
      </div>
    </Fragment>
  );
};

export default Proyect;
