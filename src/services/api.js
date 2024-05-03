import axios from "axios";
import dotenv from 'dotenv';
import Cookies from "js-cookie";
dotenv.config()

axios.defaults.baseURL = process.env.BASE_API;


axios.interceptors.request.use(async (config)=> {
    config.headers.Authorization = `Bearer ${ Cookies.get("euprtken")}`;

    return config;
});

export default axios;