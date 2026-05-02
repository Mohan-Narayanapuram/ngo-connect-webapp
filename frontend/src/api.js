import axios from "axios";

const API = axios.create({
  baseURL: "https://ngo-connect-webapp.onrender.com",
});

export default API;