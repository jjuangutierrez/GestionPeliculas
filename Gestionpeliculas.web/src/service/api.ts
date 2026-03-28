import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:4000/api",
  baseURL: "https://gestionpeliculas-8n0v.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;