export default class BookingService {
    httpClient;
    baseUrl;
    constructor(httpClient, baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }
    async getBookings() {
        return await this.httpClient.get(`${this.baseUrl}/bookings`);
    }
    async getTodayBookings() {
        return await this.httpClient.get(`${this.baseUrl}/bookings/today`);
    }
    async getWeeklyBookings(startDate, endDate) {
        return await this.httpClient.get(`${this.baseUrl}/bookings/weekly?startDate=${startDate}&endDate=${endDate}`);
    }
    async book(payload) {
        return await this.httpClient.post(`${this.baseUrl}/bookings`, payload);
    }
    async cancel(bookingId) {
        return await this.httpClient.patch(`${this.baseUrl}/bookings/${bookingId}/cancel`, undefined);
    }
}
