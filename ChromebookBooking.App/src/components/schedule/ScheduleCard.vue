<script setup lang="ts">
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

interface ReservationDialog {
  day: Day
  period: Period
}

interface ReservationForm {
  sectionId: number | null
  discipline: string
}

const props = defineProps<{
  reservationDialog: ReservationDialog
  reservationForm: ReservationForm
  sections: Section[]
  loggedTeacherName: string
  availableCabinets: {
    id: number
    name: string
  }[]
}>()

const emit = defineEmits<{
  close: []
  confirm: []
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
</script>

<template>
  <div class="modal-backdrop"
       @click.self="emit('close')">

    <section class="reservation-modal"
             role="dialog"
             aria-modal="true"
             aria-labelledby="reservation-title">

      <header class="modal-header">

        <div>

          <h2 id="reservation-title">
            Nova Reserva
          </h2>

          <p>
            Reserve um gabinete
            para sua aula
          </p>

        </div>

        <button class="close-button"
                type="button"
                aria-label="Fechar"
                @click="emit('close')">

          <i class="pi pi-times"></i>

        </button>

      </header>

      <div class="reservation-details">

        <div class="detail-card">

          <span>
            Data
          </span>

          <strong>
            {{
              formatDayNumber(
                props.reservationDialog.day.date,
              )
            }}/{{
              String(
                props.reservationDialog.day.date.getMonth() + 1,
              ).padStart(2, '0')
            }}/{{
              props.reservationDialog.day.date.getFullYear()
            }}
          </strong>

        </div>

        <div class="detail-card">

          <span>
            Horário
          </span>

          <strong>
            {{
              props.reservationDialog.period.label
            }}
          </strong>

          <small>
            {{
              props.reservationDialog.period.time
            }}
          </small>

        </div>

      </div>

      <div class="form-field">

        <label>
          Professor
        </label>

        <div class="teacher-field">

          <i class="pi pi-user"></i>

          <span>
            {{ props.loggedTeacherName }}
          </span>

        </div>

      </div>

      <div class="form-field">

        <label for="reservation-section">
          Turma
        </label>

        <select id="reservation-section"
                v-model.number="
            props.reservationForm.sectionId
          ">

          <option :value="null">
            Selecione...
          </option>

          <option v-for="section in props.sections"
                  :key="section.id"
                  :value="section.id">
            {{ section.name }}
          </option>

        </select>

      </div>

      <div class="form-field">

        <label for="reservation-discipline">
          Disciplina
          <span>
            (opcional)
          </span>
        </label>

        <input id="reservation-discipline"
               v-model="
            props.reservationForm.discipline
          "
               type="text"
               placeholder="Ex: Matemática" />

      </div>

      <div class="assignment-info">

        <i class="pi pi-sparkles"></i>

        <span>

          O sistema associará
          automaticamente

          <strong>
            {{
              props.availableCabinets[0]?.name ??
              'um gabinete'
            }}
          </strong>

          para você.

        </span>

      </div>

      <p v-if="
          props.availableCabinets.length === 0
        "
         class="no-cabinets-message">
        Não há gabinetes
        disponíveis neste horário.
      </p>

      <footer class="modal-footer">

        <button class="secondary-modal-button"
                type="button"
                @click="emit('close')">
          Cancelar
        </button>

        <button class="primary-modal-button"
                type="button"
                :disabled="
            !props.reservationForm.sectionId ||
            props.availableCabinets.length === 0
          "
                @click="emit('confirm')">
          Confirmar Reserva
        </button>

      </footer>

    </section>

  </div>
</template>

<style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgb(15 23 42 / 0.64);
  }

  .reservation-modal {
    width: min(100%, 26rem);
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    padding: 1.3rem;
    border: 1px solid var(--p-surface-200);
    border-radius: 0.6rem;
    background: var(--p-surface-0);
    box-shadow: 0 1.5rem 3rem rgb(15 23 42 / 0.2);
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.15rem;
  }

    .modal-header h2 {
      margin: 0;
      color: var(--p-surface-900);
      font-size: 1.15rem;
      font-weight: 700;
    }

    .modal-header p {
      margin: 0.25rem 0 0;
      color: var(--p-surface-500);
      font-size: 0.7rem;
    }

  .close-button {
    display: grid;
    width: 1.8rem;
    height: 1.8rem;
    place-items: center;
    border: 0;
    border-radius: 0.3rem;
    color: var(--p-surface-500);
    background: transparent;
    cursor: pointer;
  }

    .close-button:hover {
      color: var(--p-surface-800);
      background: var(--p-surface-100);
    }

  .reservation-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
    margin-bottom: 1.1rem;
  }

  .detail-card {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.65rem;
    border-radius: 0.35rem;
    background: var(--p-surface-50);
  }

    .detail-card span,
    .detail-card small {
      color: var(--p-surface-500);
      font-size: 0.63rem;
    }

    .detail-card strong {
      color: var(--p-surface-800);
      font-size: 0.74rem;
    }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 0.9rem;
  }

    .form-field label {
      color: var(--p-surface-700);
      font-size: 0.72rem;
      font-weight: 600;
    }

      .form-field label span {
        color: var(--p-surface-400);
        font-weight: 400;
      }

    .form-field input,
    .form-field select {
      width: 100%;
      height: 2.25rem;
      padding: 0 0.7rem;
      border: 1px solid var(--p-surface-200);
      border-radius: 0.35rem;
      outline: 0;
      color: var(--p-surface-700);
      background: var(--p-surface-0);
      font: inherit;
      font-size: 0.72rem;
    }

      .form-field input::placeholder {
        color: var(--p-surface-400);
      }

      .form-field input:focus,
      .form-field select:focus {
        border-color: #6ea4df;
        box-shadow: 0 0 0 2px rgb(78 141 211 / 0.12);
      }

  .teacher-field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    min-height: 2.25rem;
    padding: 0 0.7rem;
    border: 1px solid var(--p-surface-200);
    border-radius: 0.35rem;
    color: var(--p-surface-700);
    background: var(--p-surface-50);
    font-size: 0.72rem;
  }

    .teacher-field i {
      color: var(--p-primary-500);
    }

  .assignment-info {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.7rem;
    border: 1px solid #d9e6f7;
    border-radius: 0.35rem;
    color: #4d79a8;
    background: #f4f8fd;
    font-size: 0.66rem;
    line-height: 1.4;
  }

    .assignment-info i {
      margin-top: 0.05rem;
      color: #4e8dd3;
    }

    .assignment-info strong {
      color: #3573c2;
    }

  .no-cabinets-message {
    margin: 0.65rem 0 0;
    color: #c77929;
    font-size: 0.68rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.55rem;
    margin-top: 1.2rem;
  }

  .secondary-modal-button,
  .primary-modal-button {
    min-height: 2.2rem;
    padding: 0 0.85rem;
    border-radius: 0.35rem;
    font: inherit;
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
  }

  .secondary-modal-button {
    border: 1px solid var(--p-surface-200);
    color: var(--p-surface-600);
    background: var(--p-surface-0);
  }

    .secondary-modal-button:hover {
      background: var(--p-surface-50);
    }

  .primary-modal-button {
    border: 1px solid #2f80ed;
    color: white;
    background: #287be5;
  }

    .primary-modal-button:hover:not(:disabled) {
      background: #1d6dcc;
    }

    .primary-modal-button:disabled {
      border-color: var(--p-surface-200);
      color: var(--p-surface-400);
      background: var(--p-surface-100);
      cursor: not-allowed;
    }

  @media (max-width: 700px) {
    .reservation-modal {
      width: min( calc(100vw - 2rem), 26rem );
    }

    .reservation-details {
      grid-template-columns: 1fr;
    }

    .modal-footer {
      flex-direction: column-reverse;
    }

    .secondary-modal-button,
    .primary-modal-button {
      width: 100%;
    }
  }
</style>
