import axios from "axios";

// const default_url = "http://localhost:3000";
const default_url = "https://protected-tor-10719.herokuapp.com";

export const getStories = () => 
{
  try
  {
    let path = `${ default_url}`;
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
      let path = `${default_url}`;
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
    let path = `${default_url}`;
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
    let path = `${default_url}`;
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
      let path = `${default_url}`;
      path = path.concat(`/stories/${id}`);

      return axios.delete(path);
    }
    catch(err)
    {
      console.log("Error: " + err);
    }
}
