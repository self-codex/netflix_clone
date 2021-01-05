import axios from "axios";

// i have create to set baseURL in axios and after ading in the help of hooks

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

export default instance;
