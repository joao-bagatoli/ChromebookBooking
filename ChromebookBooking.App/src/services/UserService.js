export default class UserService {
    httpClient;
    baseUrl;
    constructor(httpClient, baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }
    async getAllUsers() {
        return await this.httpClient.get(`${this.baseUrl}/users`);
    }
    async getUserById(id) {
        return await this.httpClient.get(`${this.baseUrl}/users/${id}`);
    }
    async createUser(name, email, role, sectionIds) {
        return await this.httpClient.post(`${this.baseUrl}/users`, { name, email, role, sectionIds });
    }
    async updateUser(id, payload) {
        return await this.httpClient.put(`${this.baseUrl}/users/${id}`, payload);
    }
    async getLoggedUser() {
        return await this.httpClient.get(`${this.baseUrl}/users/me`);
    }
    async deleteUser(id) {
        return await this.httpClient.delete(`${this.baseUrl}/users/${id}`);
    }
}
