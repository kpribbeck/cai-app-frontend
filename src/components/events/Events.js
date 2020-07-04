import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getEvents } from "../../requests/EventRequests";
import EventItem from "./EventItem";
import FilterBox from "../layout/FilterBox";

const Events = ({ createNotification }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      setLoading(false);
      setEvents(res.data);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  const displayEvents = events.map(
    (event) =>
      (event.title.toLowerCase().includes(filter.toLowerCase()) ||
        event.description.toLowerCase().includes(filter.toLowerCase())) && (
        <EventItem
          map={false}
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          place={event.place}
          category={event.category}
          createNotification={createNotification}
          userId={event.userId}
          getData={getData}
        />
      )
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <FilterBox value={filter} onChange={setFilter} />
      <h1 className="titles">Eventos</h1>

      {events.length > 0 ? (
        displayEvents
      ) : (
        <p className="textos"> ¡Aún no tenemos eventos!</p>
      )}
    </Fragment>
  );
};

export default Events;
