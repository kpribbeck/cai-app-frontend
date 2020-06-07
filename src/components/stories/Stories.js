import React, { useEffect, Fragment, useState } from "react";
import Spinner from "../layout/Spinner";
import { getStories } from "../../requests/StoryRequests";
import StoryItem from "./StoryItem";
import "./Stories.css";

const Stories = ({ createNotification }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const displayStories = stories.map((story) => (
    <StoryItem
      key={story.id}
      id={story.id}
      title={story.title}
      body={story.body}
      createNotification={createNotification}
      userId={story.userId}
    />
  ));

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Últimas Noticias</h1>

      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Bienvenido a CaiApp
      </p>

      {stories.length > 0 ? (
        displayStories
      ) : (
        <p style={{ textAlign: "center" }}>
          {" "}
          ¡Aún no tenemos historias que mostrar!
        </p>
      )}
    </Fragment>
  );
};

export default Stories;
