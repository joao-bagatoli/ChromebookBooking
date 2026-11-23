<script setup lang="ts">
  import { inject, computed, onMounted, ref, watch } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import { useBookingStore } from '../stores/booking'
  import { useToast } from 'primevue/usetoast'
  import ServiceFactory from '../services/ServiceFactory'
  import type { Section } from '../types/section'
  import ScheduleCalendar from '../components/schedule/ScheduleCalendar.vue'
  import ScheduleCard from '../components/schedule/ScheduleCard.vue'

  interface Period {
    id: number
    label: string
    time: string
    shift: string
  }

  interface Day {
    key: string
    label: string
    date: Date
    isPast: boolean
    isToday: boolean
  }


  const MINIMUM_DAYS = 2
  const TOTAL_CABINETS = 5

  const authStore = useAuthStore()
  const bookingStore = useBookingStore()
  const toast = useToast()
  const serviceFactory = inject('serviceFactory') as ServiceFactory
  const sectionService = serviceFactory.createSectionService()
  const classPeriodService = serviceFactory.createClassPeriodService()

  const loggedTeacherName = computed(() => {
    const fullName = authStore.user?.user_metadata?.full_name ?? 'Usuário Logado'
    return fullName.split(' ')[0] || 'Usuário'
  })

  const loggedEmail = computed(
    () => authStore.user?.email?.toLowerCase() ?? '',
  )

  const sections = ref<Section[]>([])
  const periods = ref<Period[]>([])
  const loadError = ref<string | null>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selectedDate = ref(new Date(today))

  const selectedSlot = ref<{ day: Day; period: Period } | null>(null)
  const reservationDialog = ref<{ day: Day; period: Period } | null>(null)

  function formatTime(time: string) {
    return time.slice(0, 5)
  }

  function normalizeDate(date: Date) {
    const normalized = new Date(date)
    normalized.setHours(0, 0, 0, 0)
    return normalized
  }

  function getDateKey(date: Date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-')
  }

  function isSameDate(first: Date, second: Date) {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    )
  }

  function isDateBefore(first: Date, second: Date) {
    return normalizeDate(first).getTime() < normalizeDate(second).getTime()
  }

  function addDays(date: Date, amount: number) {
    const result = new Date(date)
    result.setDate(result.getDate() + amount)
    return result
  }

  const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  const weekDays = computed<Day[]>(() => {
    const selected = normalizeDate(selectedDate.value)
    const dayOfWeek = selected.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = addDays(selected, mondayOffset)

    const result: Day[] = []

    for (let index = 0; index < 5; index++) {
      const currentDate = addDays(monday, index)

      result.push({
        key: getDateKey(currentDate),
        label: weekdayFormatter.format(currentDate),
        date: currentDate,
        isPast: isDateBefore(currentDate, today),
        isToday: isSameDate(currentDate, today),
      })
    }

    return result
  })

  watch(
    () => weekDays.value[0]!.key,
    () => {
      const days = weekDays.value
      bookingStore.fetchWeek(days[0]!.key, days[days.length - 1]!.key)
    },
    { immediate: true },
  )

  onMounted(async () => {
    try {
      const [loadedSections, classPeriods] = await Promise.all([
        sectionService.getAllSections(),
        classPeriodService.getAllClassPeriods(),
      ])

      sections.value = loadedSections

      console.log('classPeriods', classPeriods);

      periods.value = classPeriods.map(classPeriod => ({
        id: classPeriod.id,
        label: classPeriod.name,
        time: `${formatTime(classPeriod.startTime)}–${formatTime(classPeriod.endTime)}`,
        shift: classPeriod.shift,
      }))
    } catch (e) {
      loadError.value =
        e instanceof Error ? e.message : 'Não foi possível carregar turmas e horários.'
    }
  })


  function isTooSoon(day: Day) {
    const earliestDate = addDays(normalizeDate(new Date()), MINIMUM_DAYS)
    return isDateBefore(day.date, earliestDate)
  }

  function isLocked(day: Day) {
    return day.isPast || isTooSoon(day)
  }

  function getBookings(day: Day, period: Period) {
    return bookingStore.getBookings(day.key, period.id).map(booking => ({
      id: booking.id,
      className: booking.sectionName,
      teacher: booking.teacherName ?? booking.teacherEmail,
      cabinetId: booking.cabinetId,
      cabinetName: booking.cabinetName,
      discipline: booking.subject ?? undefined,
      isPartial: booking.isPartial,
      chromebooksQuantity: booking.chromebooksQuantity ?? null,
      isMine: booking.teacherEmail.toLowerCase() === loggedEmail.value,
    }))
  }

  function getAvailableCabinets(day: Day, period: Period) {
    const reservedCabinetIds = new Set(
      getBookings(day, period).map(booking => booking.cabinetId),
    )

    const available = []

    for (let cabinetId = 1; cabinetId <= TOTAL_CABINETS; cabinetId++) {
      if (!reservedCabinetIds.has(cabinetId)) {
        available.push({
          id: cabinetId,
          name: `Gabinete ${String(cabinetId).padStart(2, '0')}`,
        })
      }
    }

    return available
  }

  function moveWeek(amount: number) {
    selectedDate.value = addDays(selectedDate.value, amount * 7)
    selectedSlot.value = null
  }

  function goToToday() {
    selectedDate.value = new Date(today)
    selectedSlot.value = null
  }

  function selectSlot(day: Day, period: Period) {
    if (day.isPast) return
    selectedSlot.value = { day, period }
  }

  function openReservation(day: Day, period: Period) {
    if (isLocked(day)) return
    if (getAvailableCabinets(day, period).length === 0) return

    selectedSlot.value = { day, period }
    bookingStore.clearError()
    reservationDialog.value = { day, period }
  }

  function closeReservation() {
    reservationDialog.value = null
    bookingStore.clearError()
  }

  async function confirmReservation(form: {
    sectionId: number
    discipline: string
    isPartial: boolean
    chromebooksQuantity: number | null
  }) {
    if (!reservationDialog.value) return

    const teacherId = authStore.profile?.id
    if (!teacherId) {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuário não identificado. Faça login novamente.',
        life: 4000
      })
      return
    }

    if (form.isPartial && (!form.chromebooksQuantity || form.chromebooksQuantity <= 0)) {
      toast.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Informe a quantidade de chromebooks para a reserva parcial.',
        life: 4000
      })
      return
    }

    const { day, period } = reservationDialog.value

    try {
      await bookingStore.book({
        date: day.key,
        classPeriodId: period.id,
        teacherId,
        sectionId: form.sectionId,
        isPartial: form.isPartial,
        chromebooksQuantity: form.isPartial ? form.chromebooksQuantity : null,
        subject: form.discipline.trim() || null,
      })

      reservationDialog.value = null

      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Reserva realizada com sucesso.',
        life: 3000
      })
    } catch {
      // O modal de reserva continua aberto para o professor tentar de novo
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: bookingStore.error ?? 'Não foi possível realizar a reserva.',
        life: 4000
      })
    }
  }

  async function cancel(bookingId: number) {
    if (!window.confirm('Cancelar esta reserva?')) return

    toast.add({
      severity: 'info',
      summary: 'Cancelando',
      detail: 'Cancelando a sua reserva, aguarde...',
      life: 3000
    })

    try {
      await bookingStore.cancel(bookingId)

      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Reserva cancelada com sucesso.',
        life: 3000
      })
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível cancelar a reserva.',
        life: 4000
      })
    }
  }
</script>

<template>
  <section class="schedule-page">

    <header class="schedule-header">
      <div>
        <h1 class="view-title">
          Agenda
        </h1>

        <p class="view-subtitle">
          Gerencie todas as reservas
        </p>
      </div>
    </header>

    <ScheduleCalendar :week-days="weekDays"
                      :periods="periods"
                      :selected-slot="selectedSlot"
                      :total-cabinets="TOTAL_CABINETS"
                      :get-bookings="getBookings"
                      :get-available-cabinets="getAvailableCabinets"
                      :is-locked="isLocked"
                      @move-week="moveWeek"
                      @go-to-today="goToToday"
                      @select-slot="selectSlot"
                      @open-reservation="openReservation"
                      @cancel-booking="cancel" />

    <p v-if="loadError"
       class="page-error">
      {{ loadError }}
    </p>

    <!-- O erro da reserva agora aparece no toast, por isso :error="null" -->
    <ScheduleCard v-if="reservationDialog"
                  :reservation-dialog="reservationDialog"
                  :sections="sections"
                  :logged-teacher-name="loggedTeacherName"
                  :available-cabinets="getAvailableCabinets(
                    reservationDialog.day,
                    reservationDialog.period,
                  )"
                  :saving="bookingStore.saving"
                  :error="null"
                  @close="closeReservation"
                  @confirm="confirmReservation" />

  </section>
</template>

<style scoped>
  .schedule-page {
    width: 100%;
    min-width: 0;
    padding: 0.25rem 0 2rem;
  }

  .schedule-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1.35rem;
  }

  .page-error {
    margin: 0.75rem 0 0;
    color: #c0392b;
    font-size: 0.8rem;
  }
</style>
