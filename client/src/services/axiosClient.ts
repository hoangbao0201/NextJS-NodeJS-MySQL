import axios from "axios";


export const baseURL = `${process.env.URL_SERVER}`

export const axiosClient = axios.create({
    baseURL
})