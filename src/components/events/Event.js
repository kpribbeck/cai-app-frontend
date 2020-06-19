import React, { useState, useEffect, Fragment } from 'react';
import { getEvent } from '../../requests/EventRequests';
import { useParams } from 'react-router-dom';
import EventItem from './EventItem';
import Spinner from '../layout/Spinner';

const Event = () => {
  const urlParams = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // makes async call to DB
  const getData = async (eventId) => {
    try {
      setLoading(true);
      const res = await getEvent(eventId);
      setLoading(false);
      setEvent(res.data);
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
      <br/>
      <div className='mt-3'>
        <EventItem {...event} />
      </div>
    </Fragment>
  );
};

export default Event;
