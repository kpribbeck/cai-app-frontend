import axios from "axios";

// const default_url = "http://localhost:3000";
const default_url = "https://protected-tor-10719.herokuapp.com/";

export const getEvents = () => 
{
  try
  {
    let path = `${process.env.BACKEND_URL || default_url}`;
    path = path.concat(`/events`);

    return axios.get(path);
  }
  catch(err)
  {
    console.log("Error: " + err);
  }
}

export const getEvent = (id) =>
{
  try
    {
      let path = `${process.env.BACKEND_URL || default_url}`;
      path = path.concat(`/events/${id}`);

      return axios.get(path);
    }
    catch(err)
    {
      console.log("Error: " + err);
    }
}