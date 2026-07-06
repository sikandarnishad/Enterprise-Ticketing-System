import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7035/api",
});

export default api;