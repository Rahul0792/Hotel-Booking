import axios from "axios";

const BASE_URL = "http://172.20.10.5:8080/api";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
