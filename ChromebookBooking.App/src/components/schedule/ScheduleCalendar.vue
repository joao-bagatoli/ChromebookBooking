<script setup lang="ts">
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

interface SelectedSlot {
  day: Day
  period: Period
}

const props = defineProps<{
  weekDays: Day[]
  periods: Period[]
  selectedSlot: SelectedSlot | null
  totalCabinets: number
  getBookings: (
    day: Day,
    period: Period,
  ) => Booking[]
  getAvailableCabinets: (
    day: Day,
    period: Period,
  ) => {
    id: number
    name: string
  }[]
}>()

const emit = defineEmits<{
  moveWeek: [amount: number]
  goToToday: []
  selectSlot: [
    day: Day,
    period: Period,
  ]
  openReservation: [
    day: Day,
    period: Period,
  ]
}>()

const dayNumberFormatter =
  new Intl.DateTimeFormat(
    'pt-BR',
    {
      day: '2-digit',
    },
  )

function formatDayNumber(
  date: Date,
) {
  return dayNumberFormatter.format(
    date,
  )
}

function capitalize(
  value: string,
) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  )
}
</script>

<template>
  <div>

    <div class="calendar-actions"
         aria-label="Navegação da agenda">

      <button class="calendar-button icon-button"
              type="button"
              aria-label="Semana anterior"
              @click="emit('moveWeek', -1)">
        <i class="pi pi-angle-left"></i>
      </button>

      <button class="calendar-button today-button"
              type="button"
              @click="emit('goToToday')">
        Hoje
      </button>

      <button class="calendar-button icon-button"
              type="button"
              aria-label="Próxima semana"
              @click="emit('moveWeek', 1)">
        <i class="pi pi-angle-right"></i>
      </button>

    </div>

    <div class="calendar-shell">

      <div class="calendar-grid calendar-heading">

        <div class="period-heading"></div>

        <div v-for="day in props.weekDays"
             :key="day.key"
             class="day-heading"
             :class="{
            'is-selected-day':
              day.isToday,

            'is-past-day':
              day.isPast,
          }">

          <span>
            {{ capitalize(day.label) }}
          </span>

          <strong>
            {{ formatDayNumber(day.date) }}
          </strong>

          <small v-if="day.isToday"
                 class="today-label">
            Hoje
          </small>

          <small v-else-if="day.isPast"
                 class="blocked-label">
            Bloqueado
          </small>

        </div>

      </div>

      <div v-for="period in props.periods"
           :key="period.id"
           class="calendar-grid calendar-row">

        <div class="period-cell">

          <strong>
            {{ period.label }}
          </strong>

          <span>
            {{ period.time }}
          </span>

        </div>

        <div v-for="day in props.weekDays"
             :key="`${day.key}-${period.id}`"
             class="calendar-cell"
             :class="{
            'has-selection':
              props.selectedSlot?.day.key ===
                day.key &&
              props.selectedSlot?.period.id ===
                period.id,

            'is-past':
              day.isPast,
          }"
             role="button"
             tabindex="0"
             @click="
            emit(
              'selectSlot',
              day,
              period,
            )
          "
             @keydown.enter="
            emit(
              'selectSlot',
              day,
              period,
            )
          ">

          <span class="availability"
                :class="{
                occupied:
                props.getBookings(
                day,
                period,
                ).length>
            0,
            }"
            >
            {{
              props.getBookings(
                day,
                period,
              ).length
            }}/{{ props.totalCabinets }}
          </span>

          <div v-if="
              props.getBookings(
                day,
                period,
              ).length
            "
               class="booking-list">

            <span v-for="booking in props.getBookings(
                day,
                period,
              )"
                  :key="
                `${booking.className}-${booking.teacher}-${booking.cabinetId}`
              "
                  class="booking-chip">

              <span>
                {{ booking.className }}
                ·
                {{ booking.teacher }}
              </span>

              <small>
                {{ booking.cabinetName }}
              </small>

              <small v-if="booking.discipline">
                {{ booking.discipline }}
              </small>

            </span>

            <small>
              {{
                props.getAvailableCabinets(
                  day,
                  period,
                ).length
              }}
              vagas
            </small>

          </div>

          <button class="reserve-button"
                  type="button"
                  :disabled="
              day.isPast ||
              props.getAvailableCabinets(
                day,
                period,
              ).length === 0
            "
                  @click.stop="
              emit(
                'openReservation',
                day,
                period,
              )
            ">

            <i class="pi pi-plus"></i>

            {{
              props.getAvailableCabinets(
                day,
                period,
              ).length
                ? 'Reservar gabinete'
                : 'Sem gabinetes'
            }}

          </button>

          <span v-if="day.isPast"
                class="past-label">

            <i class="pi pi-lock"></i>

            Indisponível

          </span>

        </div>

      </div>

    </div>

    <div v-if="props.selectedSlot"
         class="selection-summary">

      <i class="pi pi-info-circle"></i>

      <span>

        <strong>
          {{ props.selectedSlot.period.label }}
        </strong>

        em

        {{
          capitalize(
            props.selectedSlot.day.label,
          )
        }},

        {{
          formatDayNumber(
            props.selectedSlot.day.date,
          )
        }}

        ·

        {{ props.selectedSlot.period.time }}

      </span>

      <span class="summary-status">

        {{
          props.getBookings(
            props.selectedSlot.day,
            props.selectedSlot.period,
          ).length
            ? 'Horário com reserva'
            : 'Horário disponível'
        }}

      </span>

    </div>

  </div>
</template>

<style scoped>
  .calendar-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .calendar-button {
    height: 2.4rem;
    border: 1px solid var(--p-surface-200);
    border-radius: 0.45rem;
    background: var(--p-surface-0);
    color: var(--p-surface-600);
    font: inherit;
    font-size: 0.82rem;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }

    .calendar-button:hover {
      border-color: var(--p-primary-300);
      color: var(--p-primary-600);
      background: var(--p-primary-50);
    }

  .icon-button {
    width: 2.4rem;
    display: grid;
    place-items: center;
    font-size: 0.9rem;
  }

  .today-button {
    min-width: 4rem;
    padding: 0 0.85rem;
    font-weight: 600;
  }

  .calendar-shell {
    overflow-x: auto;
    border: 1px solid var(--p-surface-100);
    border-radius: 0.55rem;
    background: var(--p-surface-0);
    box-shadow: 0 1px 4px rgb(15 23 42 / 0.04);
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: 6.2rem repeat(5, minmax(12rem, 1fr));
    min-width: 66rem;
  }

  .calendar-heading {
    min-height: 5rem;
    background: var(--p-surface-0);
    border-bottom: 1px solid var(--p-surface-100);
  }

  .period-heading {
    border-right: 1px solid var(--p-surface-100);
  }

  .day-heading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    padding: 0 0.8rem;
    color: var(--p-surface-500);
    font-size: 0.82rem;
    text-align: center;
    border-right: 1px solid var(--p-surface-100);
  }

    .day-heading:last-child {
      border-right: 0;
    }

    .day-heading strong {
      color: var(--p-surface-800);
      font-size: 1.15rem;
      font-weight: 700;
      line-height: 1;
    }

    .day-heading.is-selected-day {
      background: #dbe4f1;
    }

      .day-heading.is-selected-day strong {
        color: #2b6ecb;
      }

  .today-label {
    color: #2b6ecb;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .day-heading.is-past-day {
    background: #f5f5f5;
    color: var(--p-surface-400);
  }

    .day-heading.is-past-day strong {
      color: var(--p-surface-400);
    }

  .blocked-label {
    color: var(--p-surface-400);
    font-size: 0.58rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .calendar-row {
    min-height: 7rem;
    border-bottom: 1px solid var(--p-surface-100);
  }

    .calendar-row:last-child {
      border-bottom: 0;
    }

  .period-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
    padding: 0.75rem 0.6rem;
    background: var(--p-surface-0);
    border-right: 1px solid var(--p-surface-100);
  }

    .period-cell strong {
      color: var(--p-surface-800);
      font-size: 0.78rem;
      line-height: 1.2;
      font-weight: 700;
    }

    .period-cell span {
      color: var(--p-surface-400);
      font-size: 0.68rem;
      line-height: 1.2;
    }

  .calendar-cell {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    min-width: 0;
    padding: 0.65rem 0.7rem;
    border: 0;
    border-right: 1px solid var(--p-surface-100);
    background: var(--p-surface-0);
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
  }

    .calendar-cell:last-child {
      border-right: 0;
    }

    .calendar-cell:hover {
      background: #f8fafc;
    }

    .calendar-cell.has-selection {
      z-index: 1;
      background: #f1f6fd;
      box-shadow: inset 0 0 0 2px #8db4e7;
    }

    .calendar-cell.is-past {
      background: #f5f5f5;
      cursor: not-allowed;
      opacity: 0.55;
    }

      .calendar-cell.is-past:hover {
        background: #f5f5f5;
      }

      .calendar-cell.is-past .availability {
        color: var(--p-surface-400);
        background: #e9e9e9;
      }

  .availability {
    align-self: flex-start;
    padding: 0.16rem 0.38rem;
    border-radius: 0.25rem;
    color: #55b67b;
    background: #eefaf2;
    font-size: 0.68rem;
    font-weight: 600;
    line-height: 1.2;
  }

    .availability.occupied {
      color: #e6a832;
      background: #fff7e7;
    }

  .booking-list {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
  }

  .booking-chip {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0.35rem 0.45rem;
    border-radius: 0.25rem;
    color: #3573c2;
    background: #e6effd;
    font-size: 0.68rem;
    font-weight: 600;
    line-height: 1.3;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

    .booking-chip small {
      color: #6c9bd1;
      font-size: 0.58rem;
      font-weight: 500;
    }

  .booking-list > small {
    padding-left: 0.25rem;
    color: #56ad77;
    font-size: 0.64rem;
    font-weight: 500;
  }

  .reserve-button {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.3rem;
    max-width: 100%;
    margin-top: auto;
    padding: 0.32rem 0.5rem;
    border: 1px solid #c9def5;
    border-radius: 0.25rem;
    color: #3573c2;
    background: #f4f8fd;
    font: inherit;
    font-size: 0.62rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    opacity: 0;
    transform: translateY(3px);
    transition: opacity 0.15s ease, transform 0.15s ease, background-color 0.15s ease;
  }

  .calendar-cell:hover .reserve-button,
  .calendar-cell:focus-within .reserve-button {
    opacity: 1;
    transform: translateY(0);
  }

  .reserve-button:hover:not(:disabled) {
    background: #e4effd;
  }

  .reserve-button:disabled {
    border-color: var(--p-surface-200);
    color: var(--p-surface-400);
    background: var(--p-surface-100);
    cursor: not-allowed;
  }

  .reserve-button i {
    font-size: 0.58rem;
  }

  .past-label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--p-surface-400);
    font-size: 0.62rem;
    font-weight: 500;
  }

  .selection-summary {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-top: 1rem;
    padding: 0.85rem 1rem;
    border: 1px solid #d9e6f7;
    border-radius: 0.5rem;
    color: var(--p-surface-600);
    background: #f4f8fd;
    font-size: 0.8rem;
  }

    .selection-summary > i {
      color: #4e8dd3;
      font-size: 0.9rem;
    }

  .summary-status {
    margin-left: auto;
    color: var(--p-surface-500);
    font-size: 0.72rem;
  }

  @media (max-width: 700px) {
    .calendar-grid {
      min-width: 66rem;
    }

    .selection-summary {
      align-items: flex-start;
      flex-wrap: wrap;
      font-size: 0.75rem;
    }

    .summary-status {
      width: 100%;
      margin-left: 1.55rem;
    }
  }
</style>
