import React, { useState, useEffect, Fragment } from "react";
import { getStory } from "../../requests/StoryRequests";
import { useParams } from "react-router-dom";
import StoryItem from "./StoryItem";
import Spinner from "../layout/Spinner";

const Note = () => {
  const urlParams = useParams();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  // makes an async call to the DB
  const getData = async (storyId) => {
    try {
      setLoading(true);
      const res = await getStory(storyId);
      setLoading(false);
      setStory(res.data);
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
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
      <div className="mt-3">
        <StoryItem {...story} />
      </div>
    </Fragment>
  );
};

export default Note;
