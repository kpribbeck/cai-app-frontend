import { axiosInstance } from "./AxiosInstance";
import { authHeader } from "../helpers/authHeader";

export const getMessages = () => {
  try {
    let path = "/messages";

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const postMessage = (formData) => {
  try {
    let path = `/messages`;

    return axiosInstance.post(path, formData, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};
