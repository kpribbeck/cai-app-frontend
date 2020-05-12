import { axiosInstance } from "./AxiosInstance";
import { authHeader } from "../helpers/authHeader";

export const getEvents = () => {
  try {
    let path = '/events';

    return axiosInstance.get(path, authHeader());
  } 
  catch (err) {
    console.log('Error: ' + err);
  }
};

export const getEvent = (id) =>
{
  try {
    let path = `/events/${id}`;

    return axiosInstance.get(path, authHeader());
  }
  catch (err) {
    console.log('Error: ' + err);
  }
};

export const postEvent = (formData) => {
  try {
    let path = `/events`;

    return axiosInstance.post(path, formData, authHeader());
  }
  catch (err) {
    console.log('Error: ' + err);
  }
};

export const putEvent = (id, formData) => {
  try {
    let path = `/events/${id}`;

    return axiosInstance.put(path, formData, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const deleteEvent = (id) => {
  try {
    let path = `/events/${id}`;

    return axiosInstance.delete(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};
