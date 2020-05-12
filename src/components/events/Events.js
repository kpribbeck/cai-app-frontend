import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getEvents } from '../../requests/EventRequests';
import EventItem from './EventItem';

const Events = () => {

  const testEvents = [
    {
      id: 0,
      title: 'First title',
      description: 'First event description',
      organizer: 'First organizer',
      place: 'First place',
      category: 'First category',
    },
    {
      id: 1,
      title: 'Second title',
      description: 'Second event description',
      organizer: 'Second organizer',
      place: 'Second place',
      category: 'Second category',
    },
  ];

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      setLoading(false);
      setEvents(res.data);
    } catch (err) {
      setLoading(false);
      console.log('Error: ' + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayTestEvents = testEvents.map((event) => (
    <EventItem
      key={event.id}
      id={event.id}
      title={event.title}
      description={event.description}
      place={event.place}
      category={event.category}
    />
  ));

  const displayEvents = events.map((event) => (
    <EventItem
      key={event.id}
      id={event.id}
      title={event.title}
      description={event.description}
      place={event.place}
      category={event.category}
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-dark text-center'>Últimos eventos</h1>

      {events.length > 0 ? (
        displayEvents
      ) : (
        <p className='text-center'> ¡Aún no tenemos eventos!</p>
      )}
    </Fragment>
  );
};

export default Events;
