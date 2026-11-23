export default class ClassPeriodService {
    httpClient;
    baseUrl;
    constructor(httpClient, baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }
    async getAllClassPeriods() {
        return await this.httpClient.get(`${this.baseUrl}/classperiods`);
    }
}
