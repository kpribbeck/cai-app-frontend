import axios from "axios";

const default_url = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: default_url,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});