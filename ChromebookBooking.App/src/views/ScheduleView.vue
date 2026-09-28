<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import ScheduleCalendar from '../components/schedule/ScheduleCalendar.vue'
import ScheduleCard from '../components/schedule/ScheduleCard.vue'

interface Booking {
  className: string
  teacher: string
  cabinetId: number
  cabinetName: string
  discipline?: string
}

interface Period {
  id: number
  label: string
  time: string
}

interface Day {
  key: string
  label: string
  date: Date
  isPast: boolean
  isToday: boolean
}

interface Section {
  id: number
  name: string
}

const authStore = useAuthStore()

const loggedTeacherName = computed(() => {
  const fullName =
    authStore.user?.user_metadata?.full_name ??
    'Usuário Logado'

  return fullName.split(' ')[0] || 'Usuário'
})

const TOTAL_CABINETS = 5

const sections: Section[] = [
  { id: 1, name: '1ºA' },
  { id: 2, name: '1ºB' },
  { id: 3, name: '2ºA' },
  { id: 4, name: '2ºB' },
  { id: 5, name: '3ºA' },
  { id: 6, name: '3ºB' },
]

const today = new Date()

today.setHours(
  0,
  0,
  0,
  0,
)

const selectedDate = ref(
  new Date(today),
)

const selectedSlot = ref<{
  day: Day
  period: Period
} | null>(null)

const reservationDialog = ref<{
  day: Day
  period: Period
} | null>(null)

const reservationForm = ref({
  sectionId: null as number | null,
  discipline: '',
})

const periods: Period[] = [
  {
    id: 1,
    label: '1ª Aula',
    time: '07:30–08:20',
  },
  {
    id: 2,
    label: '2ª Aula',
    time: '08:20–09:10',
  },
  {
    id: 3,
    label: '3ª Aula',
    time: '09:10–10:20',
  },
  {
    id: 4,
    label: '4ª Aula',
    time: '10:20–11:10',
  },
  {
    id: 5,
    label: '5ª Aula',
    time: '13:00–13:50',
  },
  {
    id: 6,
    label: '6ª Aula',
    time: '13:50–14:40',
  },
]

const bookings = reactive<
  Record<string, Record<number, Booking[]>>
>({
  '2026-04-27': {
    1: [
      {
        className: '1ªA',
        teacher: 'Maria',
        cabinetId: 1,
        cabinetName: 'Gabinete 01',
      },
    ],

    2: [
      {
        className: '2ªB',
        teacher: 'Maria',
        cabinetId: 1,
        cabinetName: 'Gabinete 01',
      },
    ],
  },

  '2026-04-28': {
    3: [
      {
        className: '1ªA',
        teacher: 'João',
        cabinetId: 1,
        cabinetName: 'Gabinete 01',
      },
      {
        className: '3ªA',
        teacher: 'Carlos',
        cabinetId: 2,
        cabinetName: 'Gabinete 02',
      },
    ],
  },

  '2026-04-29': {
    1: [
      {
        className: '1ºB',
        teacher: 'Maria',
        cabinetId: 1,
        cabinetName: 'Gabinete 01',
      },
    ],

    5: [
      {
        className: '1ºA',
        teacher: 'Ana',
        cabinetId: 1,
        cabinetName: 'Gabinete 01',
      },
    ],
  },

  '2026-04-30': {
    2: [
      {
        className: '2ªA',
        teacher: 'Maria',
        cabinetId: 1,
        cabinetName: 'Gabinete 01',
      },
    ],
  },

  '2026-05-01': {
    4: [
      {
        className: '2ºB',
        teacher: 'Carlos',
        cabinetId: 1,
        cabinetName: 'Gabinete 01',
      },
    ],
  },
})

function normalizeDate(date: Date) {
  const normalized = new Date(date)

  normalized.setHours(
    0,
    0,
    0,
    0,
  )

  return normalized
}

function getDateKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function isSameDate(
  first: Date,
  second: Date,
) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

function isDateBefore(
  first: Date,
  second: Date,
) {
  return (
    normalizeDate(first).getTime() <
    normalizeDate(second).getTime()
  )
}

function addDays(
  date: Date,
  amount: number,
) {
  const result = new Date(date)

  result.setDate(
    result.getDate() + amount,
  )

  return result
}

const weekdayFormatter =
  new Intl.DateTimeFormat(
    'pt-BR',
    {
      weekday: 'long',
    },
  )

const weekDays =
  computed<Day[]>(() => {
    const selected =
      normalizeDate(
        selectedDate.value,
      )

    const dayOfWeek =
      selected.getDay()

    const mondayOffset =
      dayOfWeek === 0
        ? -6
        : 1 - dayOfWeek

    const monday =
      addDays(
        selected,
        mondayOffset,
      )

    const result: Day[] = []

    for (
      let index = 0;
      index < 5;
      index++
    ) {
      const currentDate =
        addDays(
          monday,
          index,
        )

      result.push({
        key:
          getDateKey(
            currentDate,
          ),

        label:
          weekdayFormatter.format(
            currentDate,
          ),

        date: currentDate,

        isPast:
          isDateBefore(
            currentDate,
            today,
          ),

        isToday:
          isSameDate(
            currentDate,
            today,
          ),
      })
    }

    return result
  })

const dateFormatter =
  new Intl.DateTimeFormat(
    'pt-BR',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  )

const headerDate =
  computed(() => {
    const formatted =
      dateFormatter.format(
        selectedDate.value,
      )

    return (
      formatted.charAt(0).toUpperCase() +
      formatted.slice(1)
    )
  })

function getBookings(
  day: Day,
  period: Period,
) {
  return (
    bookings[day.key]?.[period.id] ??
    []
  )
}

function getAvailableCabinets(
  day: Day,
  period: Period,
) {
  const reservedCabinetIds =
    new Set(
      getBookings(
        day,
        period,
      ).map(
        booking =>
          booking.cabinetId,
      ),
    )

  const available = []

  for (
    let cabinetId = 1;
    cabinetId <= TOTAL_CABINETS;
    cabinetId++
  ) {
    if (
      !reservedCabinetIds.has(
        cabinetId,
      )
    ) {
      available.push({
        id: cabinetId,
        name:
          `Gabinete ${String(
            cabinetId,
          ).padStart(2, '0')}`,
      })
    }
  }

  return available
}

function moveWeek(
  amount: number,
) {
  selectedDate.value =
    addDays(
      selectedDate.value,
      amount * 7,
    )

  selectedSlot.value = null
}

function goToToday() {
  selectedDate.value =
    new Date(today)

  selectedSlot.value = null
}

function selectSlot(
  day: Day,
  period: Period,
) {
  if (day.isPast) {
    return
  }

  selectedSlot.value = {
    day,
    period,
  }
}

function openReservation(
  day: Day,
  period: Period,
) {
  if (day.isPast) {
    return
  }

  if (
    getAvailableCabinets(
      day,
      period,
    ).length === 0
  ) {
    return
  }

  selectedSlot.value = {
    day,
    period,
  }

  reservationForm.value = {
    sectionId: null,
    discipline: '',
  }

  reservationDialog.value = {
    day,
    period,
  }
}

function closeReservation() {
  reservationDialog.value = null
}

function confirmReservation() {
  if (!reservationDialog.value) {
    return
  }

  if (
    !reservationForm.value.sectionId
  ) {
    return
  }

  const {
    day,
    period,
  } = reservationDialog.value

  const availableCabinets =
    getAvailableCabinets(
      day,
      period,
    )

  const cabinet =
    availableCabinets[0]

  const section =
    sections.find(
      item =>
        item.id ===
        reservationForm.value.sectionId,
    )

  if (!cabinet || !section) {
    return
  }

  const dayBookings =
    bookings[day.key] ??
    (bookings[day.key] = {})

  const periodBookings =
    dayBookings[period.id] ??
    (dayBookings[period.id] = [])

  periodBookings.push({
    className:
      section.name,

    teacher:
      loggedTeacherName.value,

    cabinetId:
      cabinet.id,

    cabinetName:
      cabinet.name,

    discipline:
      reservationForm.value
        .discipline
        .trim() ||
      undefined,
  })

  closeReservation()
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
                      @move-week="moveWeek"
                      @go-to-today="goToToday"
                      @select-slot="selectSlot"
                      @open-reservation="openReservation" />

    <ScheduleCard v-if="reservationDialog"
                  :reservation-dialog="reservationDialog"
                  :reservation-form="reservationForm"
                  :sections="sections"
                  :logged-teacher-name="loggedTeacherName"
                  :available-cabinets="
        getAvailableCabinets(
          reservationDialog.day,
          reservationDialog.period,
        )
      "
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

  .view-title {
    margin: 0;
    color: var(--p-surface-900);
    font-size: 1.75rem;
    font-weight: 700;
  }

  .view-subtitle {
    margin: 0.3rem 0 0;
    color: var(--p-surface-500);
    font-size: 0.9rem;
  }
</style>
