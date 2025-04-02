import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Change to your actual backend API
});

export default api;