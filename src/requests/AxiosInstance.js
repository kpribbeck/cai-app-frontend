import axios from "axios";

const default_url = "https://protected-tor-10719.herokuapp.com";

export const axiosInstance = axios.create({
  baseURL: default_url,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});