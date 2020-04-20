import React, { useEffect, Fragment, useState } from "react";
import Spinner from "../layout/Spinner";
import { getStories } from "../../requests/StoryRequests"
import StoryItem from "./StoryItem";

const Feed = () => {
  
  const testStories = 
  [
    {
      "title": "First title",
      "body": "First body"
    },
    {
      "title": "Second title",
      "body": "Second body"
    }
  ]

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // makes an async call to the DB
  const getData = async () => 
  {
    try
    {
      setLoading(true);
      const res = await getStories();
      setLoading(false);
      setStories(res.data);
    }
    catch(err)
    {
      setLoading(false);
      console.log("Error: " + err);
    }
  }

  // This function executes when the component is mounted 
  useEffect(() => {
    getData();
  }, []);

  // var created to test feed display without making an async call to a DB
  const displayTestStories = testStories
    .map(story => <div key={story.title}>Title: {story.title}, body: {story.body}</div>)

  // maps stories into individual components
  const displayStories = stories
    .map(story => <StoryItem key={story.id}  {...story} />)

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-dark text-center">Latest News</h1>

      <p className="lead mb-3 text-center">
        <i className="fas fa-user" />
        Welcome to CaiApp
      </p>

      {stories.length > 0 ? (
        displayStories
      ) : (
        <p className="text-center"> We don't have news here yet!</p>
      )}
    </Fragment>
  );
};

export default (Feed);
