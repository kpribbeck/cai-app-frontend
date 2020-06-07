import { BehaviorSubject } from "rxjs";
import setAuthToken from "../helpers/setAuthToken";
import { axiosInstance } from "./AxiosInstance";
import { authHeader } from "../helpers/authHeader";

// Register a User
export const postUser = async (formData) => {
  try {
    let path = `/auth/sign-up`;

    const res = await axiosInstance.post(path, formData);

    // console.log('RES: ' + JSON.stringify(res));
    // console.log('RES.payload: ' + JSON.stringify(res.data));
    // console.log('RES.user: ' + JSON.stringify(res.data.user));
    // console.log('RES.token: ' + JSON.stringify(res.data.token));

    if (res.status !== 201) {
      // Some error
      logout();
      return res.data;
    }

    // save user & token
    // localStorage.setItem('currentUser', JSON.stringify(res.data));
    // currentUserSubject.next(res.data);

    // set token in header
    // setAuthToken(res.data.token);

    // returns user
    // return res.data.user;
    return res;
  } catch (err) {
    logout();
    console.error(err);

    let error_status = err.message.split("code ")[1];
    console.log("STATUS: " + error_status);

    let error = {};
    if (error_status === "400") {
      // Form error
      error = {
        status: "400",
        message: "Datos inválidos. Verifique su información.",
      };
    } else if (error_status === "409") {
      // User already exists
      error = {
        status: "409",
        message: "Datos inválidos. Usuario ya existe.",
      };
    } else if (error_status === "403") {
      // Forbidden, only 1 admin allowed
      error = {
        status: "403",
        message: "Acceso restringido.",
      };
    } else {
      error = {
        status: "500",
        message: "Error de servidor. Intente más tarde.",
      };
    }
    return error;
  }
};

// Log in
export const authUser = async (formData) => {
  try {
    let path = `/auth/log-in`;

    const res = await axiosInstance.post(path, formData);

    if (res.status !== 200) {
      logout();
      return;
    }

    // save user & token
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    currentUserSubject.next(res.data);

    // set token in header
    // setAuthToken(res.data.token);

    // returns response
    return res;
  } catch (err) {
    console.error(err);
    logout();

    let error = {};

    let error_status = err.message.split("code ")[1];
    if (error_status === "400") {
      // Form error
      error = {
        status: "400",
        message: "Datos inválidos. Verifique su información.",
      };
    } else if (error_status === "401") {
      // User has not been activated
      error = {
        status: "401",
        message:
          "Usuario no autorizado. Contacte personal de CaiApp para solucionar el problema.",
      };
    } else {
      error = {
        status: "500",
        message: "Error de servidor. Intente más tarde.",
      };
    }

    return error;
  }
};

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authUserService = {
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

export const logout = () => {
  // remove user from local storage to log user out
  // console.log("Logging out...");
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
  setAuthToken(null);
};

export const deleteUser = (id) => {
  try {
    let path = `/users/${id}`;

    return axiosInstance.delete(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const getUsers = () => {
  try {
    let path = "/users";

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log("Error: " + err);
  }
};

export const getUsersByState = async (state) => {
  try {
    let path = `/users/requests/${state}`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.error(err);
  }
};

export const acceptUserRequest = (id) => {
  try {
    let path = `/users/requests/accept/${id}`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.error(err);
  }
};

export const rejectUserRequest = (id) => {
  try {
    let path = `/users/requests/reject/${id}`;

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.error(err);
  }
};

export const putUser = async (id, formData) => {
  try {
    let path = `/auth/${id}`;

    const res = await axiosInstance.put(path, formData, authHeader());

    // save user & token
    
    // Get the existing data
    var currentUser = localStorage.getItem("currentUser");

    // If no existing data, throw error
    // Otherwise, convert the localStorage string to an array
    if (currentUser) { currentUser = JSON.parse(currentUser); }
    else { throw new Error(); }

    // Add new data to localStorage Array
    Object.keys(currentUser.user).forEach((key) => {
      currentUser.user[key] = res.data[key];
    });

    // Save back to localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    return res;
  } catch (err) {
    let error_status = err.message.split("code ")[1];
    console.log("STATUS: " + error_status);

    let error = {};
    if (error_status === "400") {
      // Form error
      error = {
        status: "400",
        message: "Datos inválidos. Verifique su información.",
      };
    } else if (error_status === "401") {
      error = {
        status: "401",
        message: "Acceso restringido.",
      };
    } else if (error_status === "409") {
      // User already exists
      error = {
        status: "409",
        message: "Datos inválidos. Usuario ya existe.",
      };
    } else if (error_status === "403") {
      // Forbidden, only 1 admin allowed
      error = {
        status: "403",
        message: "Acceso restringido.",
      };
    } else {
      error = {
        status: "500",
        message: "Error de servidor. Intente más tarde.",
      };
    }
    return error;
  }
};
