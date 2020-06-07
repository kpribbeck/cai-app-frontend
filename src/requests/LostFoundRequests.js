import { axiosInstance } from "./AxiosInstance";
import { authHeader } from "../helpers/authHeader";

export const getLostFounds = () => {
  try {
    let path = "/lost-founds";

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const getLostFound = (id) => {
  try {
    let path = `/lost-founds/${id}`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const postLostFound = (formData) => {
  try {
    let path = `/lost-founds`;
    return axiosInstance.post(path, formData, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const putLostFound = (id, formData) => {
  try {
    let path = `/lost-founds/${id}`;

    return axiosInstance.put(path, formData, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const deleteLostFound = (id) => {
  try {
    let path = `/lost-founds/${id}`;

    return axiosInstance.delete(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};
