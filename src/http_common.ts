import axios from "axios";

export const BASE_URL: string = "http://localhost:8083/";

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
});

export default http;