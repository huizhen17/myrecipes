import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://food-finder-4u.herokuapp.com/",
})