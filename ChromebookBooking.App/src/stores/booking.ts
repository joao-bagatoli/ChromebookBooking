import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import type ServiceFactory from '../services/ServiceFactory'
import type { Booking, BookingRequest } from '../types/booking'

export const useBookingStore = defineStore('booking', () => {
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const bookingService = serviceFactory.createBookingService()
  const allBookings = ref<Booking[]>([])
  const weeklyBookings = ref<Booking[]>([])

  async function getBookings() {
    try {
      allBookings.value = await bookingService.getBookings()
    } catch (error) {
      console.error('Error loading bookings:', error)
    }
  }

  async function getWeeklyBookings(startDate: string, endDate: string) {
    try {
      weeklyBookings.value = await bookingService.getWeeklyBookings(startDate, endDate)
    } catch (error) {
      console.error('Error loading weekly bookings:', error)
    }
  }

  async function createBooking(payload: BookingRequest) {
    try {
      const newBooking = await bookingService.createBooking(payload)
      allBookings.value.push(newBooking)
    } catch (error) {
      console.error('Error creating booking:', error)
    }
  }

  async function cancelBooking(bookingId: number) {
    try {
      await bookingService.cancelBooking(bookingId)
      allBookings.value = allBookings.value.filter((b) => b.id !== bookingId)
    } catch (error) {
      console.error('Error canceling booking:', error)
    }
  }

  return {
    allBookings,
    getBookings,
    weeklyBookings,
    getWeeklyBookings,
    createBooking,
    cancelBooking
  }
})
