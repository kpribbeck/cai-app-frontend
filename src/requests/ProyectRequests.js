import { axiosInstance } from "./AxiosInstance";
import { authHeader } from "../helpers/authHeader";

export const getProyects = () => {
  try {
    let path = '/proyects';

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const getProyect = (id) => {
  try {
    let path = `/proyects/${id}`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const postProyect = (formData) => {
  try {
    let path = `/proyects`;

    return axiosInstance.post(path, formData, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const putProyect = (id, formData) => {
  try {
    let path = `/proyects/${id}`;

    return axiosInstance.put(path, formData, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const deleteProyect = (id) => {
  try {
    let path = `/proyects/${id}`;

    return axiosInstance.delete(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};
