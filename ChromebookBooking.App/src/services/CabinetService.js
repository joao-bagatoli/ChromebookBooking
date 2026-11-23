export default class CabinetService {
    httpClient;
    baseUrl;
    constructor(httpClient, baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }
    async getAllCabinets() {
        return await this.httpClient.get(`${this.baseUrl}/cabinets`);
    }
    async getCabinetById(id) {
        return await this.httpClient.get(`${this.baseUrl}/cabinets/${id}`);
    }
    async createCabinet(name) {
        return await this.httpClient.post(`${this.baseUrl}/cabinets`, {
            name
        });
    }
    async updateCabinet(id, name, isActive) {
        await this.httpClient.put(`${this.baseUrl}/cabinets/${id}`, {
            name,
            isActive
        });
    }
    // async activateCabinet(id: number): Promise<void> {
    //   return await this.httpClient.patch(
    //     `${this.baseUrl}/cabinets/${id}/activate`,
    //     {}
    //   )
    // }
    // async deactivateCabinet(id: number): Promise<void> {
    //   return await this.httpClient.patch(
    //     `${this.baseUrl}/cabinets/${id}/deactivate`,
    //     {}
    //   )
    // }
    async deleteCabinet(id) {
        return await this.httpClient.delete(`${this.baseUrl}/cabinets/${id}`);
    }
    async getCabinetsOverview() {
        return await this.httpClient.get(`${this.baseUrl}/cabinets/overview`);
    }
}
