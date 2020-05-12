import { BehaviorSubject } from 'rxjs';
import setAuthToken from '../helpers/setAuthToken';
import { axiosInstance } from './AxiosInstance';
import { authHeader } from '../helpers/authHeader';


// Register a User
export const postUser = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let path = `${process.env.BACKEND_URL || default_url}`;
    path = path.concat(`/auth/sign-up`);

    const res = await axiosInstance.post(path, formData, config);

    console.log('RES: ' + JSON.stringify(res));
    console.log('RES.payload: ' + JSON.stringify(res.data));
    console.log('RES.user: ' + JSON.stringify(res.data.user));
    console.log('RES.token: ' + JSON.stringify(res.data.token));

    if (res.status !== 201) {
      // Some error
      logout();
      return;
    }

    // save user & token
    localStorage.setItem('currentUser', JSON.stringify(res.data));
    currentUserSubject.next(res.data);

    // set token in header
    setAuthToken(res.data.token);

    // returns user
    return res.data.user;
  } catch (err) {
    logout();
    console.log('Error: ' + err);
  }
};

// Log in
export const authUser = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let path = `${process.env.BACKEND_URL || default_url}`;
    path = path.concat(`/auth/log-in`);

    const res = await axiosInstance.post(path, formData, config);

    if (res.status !== 200) {
      logout();
      return;
    }

    // save user & token
    localStorage.setItem('currentUser', JSON.stringify(res.data));
    currentUserSubject.next(res.data);

    // set token in header
    setAuthToken(res.data.token);

    // returns user
    return res.data.user;
  } catch (err) {
    console.log('Error: ' + err);
    logout();
  }
};

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
);

export const authUserService = {
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

export const logout = () => {
  // remove user from local storage to log user out
  console.log('Logging out...');
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
  setAuthToken(null);
};

export const deleteUser = (id) => {
  try {
    let path = `/users/${id}`;

    return axiosInstance.delete(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};

export const getUsers = () => {
  try {
    let path = '/users';

    return axiosInstance.get(path, authHeader());
  } catch (err) {
    console.log('Error: ' + err);
  }
};
