import type IHttpClient from '../http/IHttpClient'
import type { Booking, BookingRequest } from '../types/booking'

export default class BookingService {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  async getBookings(): Promise<Booking[]> {
    return await this.httpClient.get(`${this.baseUrl}/bookings`)
  }
  
  async getTodayBookings(): Promise<Booking[]> {
    return await this.httpClient.get(`${this.baseUrl}/bookings/today`)
  }

  async getWeeklyBookings(startDate: string, endDate: string): Promise<Booking[]> {
    return await this.httpClient.get(`${this.baseUrl}/bookings/weekly?startDate=${startDate}&endDate=${endDate}`)
  }

  async createBooking(payload: BookingRequest): Promise<Booking> {
    return await this.httpClient.post(`${this.baseUrl}/bookings`, payload)
  }

  async cancelBooking(bookingId: number): Promise<void> {
    return await this.httpClient.delete(`${this.baseUrl}/bookings/${bookingId}`)
  }
}
