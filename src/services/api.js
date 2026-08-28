import axios from "axios";

const api = axios.create({
  baseURL: "https://enterprise-ticketing-api.onrender.com/api",
});

export default api;
