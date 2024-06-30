import axios from "axios";

const instance = axios.create({
    baseURL:  process.env.API_PATH,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    maxRedirects: 5,
});

export default instance;
