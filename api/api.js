// frontend/src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // À ajuster selon votre configuration
});

// Ajouter un interceptor pour inclure le token dans chaque requête
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
