import React, { useState, useEffect, Fragment } from 'react';
import {
  getLostFound,
  getLostFounds,
} from '../../requests/LostFoundRequests';
import { useParams } from 'react-router-dom';
import LostFoundItem from './LostFoundItem';
import Spinner from '../layout/Spinner';

const LostFound = () => {
  const urlParams = useParams();

  const [lostFound, setLostFound] = useState(null);
  const [loading, setLoading] = useState(true);

  // makes async call to DB
  const getData = async (lostFoundId) => {
    try {
      setLoading(true);
      const res = await getLostFound(lostFoundId);
      setLoading(false);
      setLostFound(res.data);
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
        <LostFoundItem {...lostFound} />
      </div>
    </Fragment>
  );
};

export default LostFound;
