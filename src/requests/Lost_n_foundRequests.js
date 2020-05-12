import { axiosInstance } from "./AxiosInstance";
import { authHeader } from "../helpers/authHeader";

export const getLost_n_founds = () => {
  try {
    let path = `/lost_n_founds`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const getLost_n_found = (id) => {
  try {
    let path = `/lost_n_founds/${id}`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const postLost_n_found = (formData) => {
  try {
    let path = `/lost_n_founds`;

    return axiosInstance.post(path, formData, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const putLost_n_found = (id, formData) => {
  try {
    let path = `/lost_n_founds/${id}`;

    return axiosInstance.put(path, formData, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const deleteLost_n_found = (id) => {
  try {
    let path = `/lost_n_founds/${id}`;

    return axiosInstance.delete(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};
