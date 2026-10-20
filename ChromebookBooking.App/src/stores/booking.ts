import { inject, computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { isAxiosError } from 'axios'
import type { Booking, CreateBookingPayload } from '../types/booking'
import ServiceFactory from '../services/ServiceFactory'

export const useBookingStore = defineStore('booking', () => {
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const service = serviceFactory.createBookingService()

  const bookings = ref<Booking[]>([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref<string | null>(null)
  const currentRange = ref<{ start: string; end: string } | null>(null)

  // { '2026-10-20': { 1: [booking, ...], 2: [...] } }
  const grouped = computed(() => {
    const map: Record<string, Record<number, Booking[]>> = {}
    for (const b of bookings.value) {
      const day = (map[b.date] ??= {})
        ; (day[b.classPeriodId] ??= []).push(b)
    }
    return map
  })

  function getBookings(dayKey: string, periodId: number): Booking[] {
    return grouped.value[dayKey]?.[periodId] ?? []
  }

  // Extrai a mensagem enviada pelo backend (ProblemDetails.detail / message)
  // em vez do texto genérico do Axios ("Request failed with status code 400")
  function messageOf(e: unknown) {
    if (isAxiosError(e)) {
      const data = e.response?.data as
        | { detail?: string; message?: string; title?: string }
        | string
        | undefined

      if (typeof data === 'string' && data.trim()) return data
      if (data && typeof data === 'object') {
        const message = data.detail ?? data.message ?? data.title
        if (message) return message
      }
      if (!e.response) return 'Não foi possível conectar ao servidor.'
    }
    return e instanceof Error ? e.message : 'Erro inesperado'
  }

  function clearError() {
    error.value = null
  }

  async function fetchWeek(start: string, end: string) {
    currentRange.value = { start, end }
    loading.value = true
    error.value = null
    try {
      const result = await service.getWeeklyBookings(start, end)
      // ignora resposta de uma semana que já deixou de ser a atual
      if (currentRange.value?.start === start) {
        // protege contra resposta fora do formato esperado
        bookings.value = Array.isArray(result) ? result : []
      }
    } catch (e) {
      error.value = messageOf(e)
    } finally {
      loading.value = false
    }
  }

  async function refresh() {
    if (currentRange.value) {
      await fetchWeek(currentRange.value.start, currentRange.value.end)
    }
  }

  async function run(action: () => Promise<void>) {
    saving.value = true
    error.value = null
    try {
      await action()
      await refresh()
    } catch (e) {
      error.value = messageOf(e)
      throw e
    } finally {
      saving.value = false
    }
  }

  const book = (payload: CreateBookingPayload) => run(() => service.book(payload))
  const cancel = (id: number) => run(() => service.cancel(id))

  return {
    bookings,
    loading,
    saving,
    error,
    getBookings,
    clearError,
    fetchWeek,
    refresh,
    book,
    cancel,
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
