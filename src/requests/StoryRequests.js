import { axiosInstance } from "./AxiosInstance";
import { authHeader } from "../helpers/authHeader";

export const getStories = () => {
  try {
    let path = "/stories";

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const getStory = (id) => {
  try {
    let path = `/stories/${id}`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const postStory = (formData) => {
  try {
    let path = `/stories`;

    return axiosInstance.post(path, formData, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const putStory = (id, formData) => {
  try {
    let path = `/stories/${id}`;

    return axiosInstance.put(path, formData, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const deleteStory = (id) => {
  try {
    let path = `/stories/${id}`;

    return axiosInstance.delete(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};
