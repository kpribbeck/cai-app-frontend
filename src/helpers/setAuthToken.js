import { axiosInstance } from "../requests/AxiosInstance";

const setAuthToken = token => {
  if (token) {
    // axios.defaults.headers.common["x-auth-token"] = token;
    console.log("Header Set succesfully");
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    console.log("Deleting Token from Header.");
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
