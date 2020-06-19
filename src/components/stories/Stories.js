import React, { useEffect, Fragment, useState } from "react";
import Spinner from "../layout/Spinner";
import { getStories } from "../../requests/StoryRequests";
import StoryItem from "./StoryItem";
import FilterBox from "../layout/FilterBox";
import "../layout/main.css";

const Stories = ({ createNotification }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  // makes an async call to the DB
  const getData = async () => {
    try {
      setLoading(true);
      const res = await getStories();
      setLoading(false);
      setStories(res.data);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  // This function executes when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  // maps stories into individual components
  const displayStories = stories.map(
    (story) =>
      (story.title.toLowerCase().includes(filter.toLowerCase()) ||
        story.body.toLowerCase().includes(filter.toLowerCase())) && (
        <StoryItem
          key={story.id}
          id={story.id}
          title={story.title}
          body={story.body}
          createNotification={createNotification}
          userId={story.userId}
          getData={getData}
        />
      )
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <FilterBox value={filter} onChange={setFilter} />
      <h1 className="titles">Últimas Noticias</h1>

      <p className="texto">Bienvenido a CaiApp</p>

      {stories.length > 0 ? (
        displayStories
      ) : (
        <p className="texto"> ¡Aún no tenemos historias que mostrar!</p>
      )}
    </Fragment>
  );
};

export default Stories;
