import React, { useState, useEffect, Fragment } from 'react';
import { getUser, getUsers } from '../../requests/UserRequests';
import { useParams } from 'react-router-dom';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const User = () => {
  const urlParams = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // makes async call to DB
  const getData = async (userId) => {
    try {
      setLoading(true);
      const res = await getUser(userId);
      setLoading(false);
      setUser(res.data);
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
        <UserItem {...user} />
      </div>
    </Fragment>
  );
};

export default User;
