import axios from "axios";
import authHeader from "./auth";

const BASE_URL = "http://localhost:5207/api/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...authHeader(),
  },
});

export default api;
