import React, { useState, useEffect, Fragment } from 'react';
import {
  getLost_n_found,
  getLost_n_founds,
} from '../../requests/Lost_n_foundRequests';
import { useParams } from 'react-router-dom';
import Lost_n_foundItem from './Lost_n_foundItem';
import Spinner from '../layout/Spinner';

const Lost_n_found = () => {
  const urlParams = useParams();

  const [lost_n_found, setLost_n_found] = useState(null);
  const [loading, setLoading] = useState(true);

  // makes async call to DB
  const getData = async (lost_n_foundId) => {
    try {
      setLoading(true);
      const res = await getLost_n_found(lost_n_foundId);
      setLoading(false);
      setLost_n_found(res.data);
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
        <Lost_n_foundItem {...lost_n_found} />
      </div>
    </Fragment>
  );
};

export default Lost_n_found;
