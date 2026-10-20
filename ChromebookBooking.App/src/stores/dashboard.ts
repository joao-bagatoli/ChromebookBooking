import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import type ServiceFactory from '../services/ServiceFactory'
import type { CabinetsOverview } from '../types/cabinet'
import type { Booking } from '../types/booking'

export const useDashboardStore = defineStore('dashboard', () => {
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const cabinetService = serviceFactory.createCabinetService()
  const bookingService = serviceFactory.createBookingService()

  const cabinetsOverview = ref<CabinetsOverview>()
  const todayBookings = ref<Booking[]>([])
  const isLoadingOverview = ref(false)
  const isLoadingBookings = ref(false)

  async function getCabinetsOverview() {
    isLoadingOverview.value = true
    try {
      cabinetsOverview.value = await cabinetService.getCabinetsOverview()
    } catch (error) {
      console.error('Error loading cabinets overview:', error)
    } finally {
      isLoadingOverview.value = false
    }
  }

  async function getTodayBookings() {
    isLoadingBookings.value = true
    try {
      todayBookings.value = await bookingService.getTodayBookings()
    } catch (error) {
      console.error('Error loading today\'s bookings:', error)
    } finally {
      isLoadingBookings.value = false
    }
  }

  return {
    cabinetsOverview,
    getCabinetsOverview,
    todayBookings,
    getTodayBookings,
    isLoadingOverview,
    isLoadingBookings,
  }
})
