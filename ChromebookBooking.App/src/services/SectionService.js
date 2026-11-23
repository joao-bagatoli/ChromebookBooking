export default class SectionService {
    httpClient;
    baseUrl;
    constructor(httpClient, baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }
    async getAllSections() {
        return await this.httpClient.get(`${this.baseUrl}/sections`);
    }
    async createSection(name, shift) {
        return await this.httpClient.post(`${this.baseUrl}/sections`, { name, shift });
    }
    async updateSection(id, payload) {
        return await this.httpClient.put(`${this.baseUrl}/sections/${id}`, payload);
    }
    async deleteSection(id) {
        return await this.httpClient.delete(`${this.baseUrl}/sections/${id}`);
    }
}
