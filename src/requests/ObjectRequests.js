import { axiosInstance } from "./AxiosInstance";
import { authHeader } from "../helpers/authHeader";

export const getObjects = () => {
  try {
    let path = "/objects";

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const getObject = (id) => {
  try {
    let path = `/objects/${id}`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const postObject = (formData) => {
  try {
    let path = `/objects`;
    return axiosInstance.post(path, formData, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const putObject = (id, formData) => {
  try {
    let path = `/objects/${id}`;

    return axiosInstance.put(path, formData, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const deleteObject = (id) => {
  try {
    let path = `/objects/${id}`;

    return axiosInstance.delete(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};
