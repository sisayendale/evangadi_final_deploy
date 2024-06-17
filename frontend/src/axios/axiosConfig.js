import axios from "axios";
const axiosConfig = axios.create({
  baseURL: "https://forumserver.sisaytech.com/api",
  //baseURL: "https://forum.sisaytech.com/api",
  //baseURL: "http://localhost:5500/api",
});

export default axiosConfig;