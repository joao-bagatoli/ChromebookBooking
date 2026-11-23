import axios from "axios";
export default class AxiosHttpClient {
    axios;
    constructor(getToken) {
        this.axios = axios.create();
        this.axios.interceptors.request.use(config => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
    async get(url, params) {
        const { data } = await this.axios.get(url, { params });
        return data;
    }
    async post(url, body) {
        const { data } = await this.axios.post(url, body);
        return data;
    }
    async put(url, body, params) {
        await this.axios.put(url, body, { params });
    }
    async patch(url, body) {
        await this.axios.patch(url, body);
    }
    async delete(url) {
        await this.axios.delete(url);
    }
}
