import axios from 'axios';

// const baseURL = "https://europroescorts.onrender.com/";
const baseURL = process.env.NEXT_PUBLIC_API;

export const config = axios.create({
    baseURL,
})

// config.interceptors.request.use(async (config)=> {
//     config.headers.Authorization = `Bearer ${ localStorage.getItem("europroescort_token")}`;

//     return config;
// });