import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazonclonesever.herokuapp.com/",
});

export default instance;
