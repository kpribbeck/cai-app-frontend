import axios from "axios";
import default_url from "./config";

// const default_url = "http://localhost:3000";

export const getStories = () => 
{
  try
  {
    let path = `${process.env.BACKEND_URL || default_url}`;
    path = path.concat(`/stories`);

    return axios.get(path);
  }
  catch(err)
  {
    console.log("Error: " + err);
  }
}

export const getStory = (id) =>
{
  try
    {
      let path = `${process.env.BACKEND_URL || default_url}`;
      path = path.concat(`/stories/${id}`);

      return axios.get(path);
    }
    catch(err)
    {
      console.log("Error: " + err);
    }
}

export const postStory = (formData) =>
{
  try
  {
    let path = `${process.env.BACKEND_URL || default_url}`;
    path = path.concat(`/stories`);

    return axios.post(path, formData);
  }
  catch(err)
  {
    console.log("Error: " + err);
  }
}

export const putStory = (id, formData) =>
{
  try
  {
    let path = `${process.env.BACKEND_URL || default_url}`;
    path = path.concat(`/stories/${id}`);

    return axios.put(path, formData);
  }
  catch(err)
  {
    console.log("Error: " + err);
  }
}

export const deleteStory = (id) =>
{
  try
    {
      let path = `${process.env.BACKEND_URL || default_url}`;
      path = path.concat(`/stories/${id}`);

      return axios.delete(path);
    }
    catch(err)
    {
      console.log("Error: " + err);
    }
}
