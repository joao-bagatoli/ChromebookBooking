import type IHttpClient from '../http/IHttpClient'
import type { Booking, CreateBookingPayload } from '../types/booking'

export default class BookingService {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly baseUrl: string,
  ) { }

  async getWeeklyBookings(startDate: string, endDate: string): Promise<Booking[]> {
    return await this.httpClient.get(
      `${this.baseUrl}/bookings?startDate=${startDate}&endDate=${endDate}`,
    )
  }

  async book(payload: CreateBookingPayload): Promise<void> {
    return await this.httpClient.post(`${this.baseUrl}/bookings`, payload)
  }

  async cancel(bookingId: number): Promise<void> {
    return await this.httpClient.patch(`${this.baseUrl}/bookings/${bookingId}/cancel`, undefined)
import type { Booking, BookingRequest } from '../types/booking'

export default class BookingService {
  constructor(private readonly httpClient: IHttpClient, private readonly baseUrl: string) { }

  async getBookings(): Promise<Booking[]> {
    return await this.httpClient.get(`${this.baseUrl}/bookings`)
  }
  
  async getTodayBookings(): Promise<Booking[]> {
    return await this.httpClient.get(`${this.baseUrl}/bookings/today`)
  }
  
  async createBooking(payload: BookingRequest): Promise<Booking> {
    return await this.httpClient.post(`${this.baseUrl}/bookings`, payload)
  }

  async cancelBooking(bookingId: number): Promise<void> {
    return await this.httpClient.delete(`${this.baseUrl}/bookings/${bookingId}`)
  }
}
